import os
from pathlib import Path
import uvicorn
from fastapi import FastAPI
from redis import Redis
import multiprocessing

# ---- Windows RQ fork workaround ----
if os.name == "nt":
    multiprocessing.set_start_method("spawn", force=True)

    original_get_context = multiprocessing.get_context

    def _patched_get_context(method=None):
        if method == "fork":
            return original_get_context("spawn")
        return original_get_context(method)

    multiprocessing.get_context = _patched_get_context
from rq import Queue
from dotenv import load_dotenv

# Robustly load .env from the project root instead of relying on CWD
env_path = Path(__file__).resolve().parent.parent.parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

app = FastAPI(title="Zebra AI Worker API")

redis_url = os.getenv("REDIS_URL", "redis://localhost:6379/0")
redis_conn = Redis.from_url(redis_url)

# Hardcoded queue name strictly to "analysis"
queue = Queue("analysis", connection=redis_conn)

from pydantic import BaseModel
from src.jobs import analyze_resume

class AnalyzeRequest(BaseModel):
    analysisResultId: str
    correlationId: str | None = None

@app.post("/api/analyze")
def enqueue_analysis(request: AnalyzeRequest):
    import logging
    logger = logging.getLogger("worker.api")
    cid_str = f"[CorrelationId={request.correlationId}] " if request.correlationId else ""
    logger.info(f"{cid_str}Enqueuing analysis job for analysisResultId={request.analysisResultId} on queue 'analysis'")
    
    # Enqueue the job. We use queue.enqueue which accepts a callable or string path
    job = queue.enqueue("src.jobs.analyze_resume", request.analysisResultId)
    return {"queued": True, "job_id": job.id}

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "worker-api"}

@app.get("/queue-status")
def queue_status():
    return {
        "queue_name": queue.name,
        "queued_jobs": len(queue),
    }

def start():
    uvicorn.run("src.main:app", host="0.0.0.0", port=8000, reload=True)

if __name__ == "__main__":
    start()
