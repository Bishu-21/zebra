import os
import logging
import psycopg
from psycopg_pool import ConnectionPool
from psycopg.rows import dict_row
from contextlib import contextmanager

logger = logging.getLogger("worker.db")

_pool = None

def get_pool():
    global _pool
    if _pool is None:
        database_url = os.getenv("DATABASE_URL")
        if not database_url:
            raise ValueError("DATABASE_URL environment variable is not set")
        
        logger.info("Initializing global PostgreSQL ConnectionPool...")
        _pool = ConnectionPool(
            conninfo=database_url,
            min_size=1,
            max_size=5,
            kwargs={"row_factory": dict_row}
        )
    return _pool

@contextmanager
def get_conn():
    """Get a short-lived connection to PostgreSQL from the global pool."""
    pool = get_pool()
    with pool.connection() as conn:
        logger.debug("Reusing connection from PostgreSQL pool")
        yield conn

def get_analysis_status(analysis_result_id: str):
    """Fetch the current status of an analysis result."""
    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT status FROM analysis_results WHERE id = %s",
                (analysis_result_id,)
            )
            row = cur.fetchone()
            return row["status"] if row else None

def update_analysis_status(
    analysis_result_id: str, 
    status: str, 
    result_json: dict = None, 
    error_message: str = None
):
    """Update pipeline status and optional result/error fields."""
    import json
    
    with get_conn() as conn:
        with conn.cursor() as cur:
            # We use json.dumps for the result_json to ensure it inserts into JSONB correctly
            json_str = json.dumps(result_json) if result_json is not None else None
            
            cur.execute(
                """
                UPDATE analysis_results 
                SET status = %s, result_json = %s, error_message = %s, updated_at = NOW()
                WHERE id = %s
                """,
                (status, json_str, error_message, analysis_result_id)
            )
        # Context manager on connection commits automatically if no exception
