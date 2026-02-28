import os
import logging
from pathlib import Path
from redis import Redis
from dotenv import load_dotenv

import multiprocessing
if os.name == 'nt':
    # Workaround for rq's hard dependency on 'fork' context which is not available on Windows
    multiprocessing.set_start_method('spawn', force=True)
    # Monkey patch get_context to not fail if 'fork' is requested
    original_get_context = multiprocessing.get_context
    def _patched_get_context(method=None):
        if method == 'fork':
            return original_get_context('spawn')
        return original_get_context(method)
    multiprocessing.get_context = _patched_get_context

from rq import Queue

# Robustly load .env from the project root instead of relying on CWD
env_path = Path(__file__).resolve().parent.parent.parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

# Setup structured logging
logging.basicConfig(
    level=os.getenv("WORKER_LOG_LEVEL", "INFO"),
    format="%(asctime)s [%(levelname)s] %(message)s",
)
logger = logging.getLogger("worker")

# Hardcoded queue name strictly to "analysis"
listen = ["analysis"]
redis_url = os.getenv("REDIS_URL", "redis://localhost:6379/0")
conn = Redis.from_url(redis_url)

def start():
    logger.info("Initializing Python Worker using rq...")
    queues = [Queue(name, connection=conn) for name in listen]
    
    # Use SimpleWorker on Windows to avoid threading/forking issues
    # Import conditionally because rq Worker default imports multiprocessing fork on Windows
    if os.name == 'nt':
        from rq import SimpleWorker as WorkerClass
    else:
        from rq import Worker as WorkerClass
        
    logger.info(f"Using worker class: {WorkerClass.__name__}")
    logger.info(f"Queue name: {listen[0]}")
    logger.info(f"Redis URL: {redis_url}")
    logger.info("Ready to receive jobs.")
    
    worker = WorkerClass(queues, connection=conn)
    worker.work()

if __name__ == '__main__':
    start()
