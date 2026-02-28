import logging
import time
from src.db import get_analysis_status, update_analysis_status

logger = logging.getLogger("worker.jobs")

def analyze_resume(analysis_result_id: str):
    """
    Background job to simulate resume analysis pipeline.
    """
    logger.info(f"[analysisResultId={analysis_result_id}] Job start: analyze_resume")
    try:
        current_status = get_analysis_status(analysis_result_id)
        if current_status in ('processing', 'complete'):
            logger.info(f"[analysisResultId={analysis_result_id}] Skipping job: already {current_status}")
            return {"status": "skipped", "reason": f"already {current_status}"}

        # 3. Set status processing
        logger.info(f"[analysisResultId={analysis_result_id}] Setting status to processing...")
        update_analysis_status(analysis_result_id, status='processing')
        logger.info(f"[analysisResultId={analysis_result_id}] DB write success: status=processing")
        
        # 4. Simulate work
        logger.info(f"[analysisResultId={analysis_result_id}] AI step start: Processing analysis result...")
        time.sleep(2)
        logger.info(f"[analysisResultId={analysis_result_id}] AI step end: Processing complete")
        
        # 5. Set status complete with dummy JSON
        dummy_result = {
            "score": 85,
            "feedback": ["Great impact statements.", "Consider adding more metrics."]
        }
        logger.info(f"[analysisResultId={analysis_result_id}] Setting status to complete...")
        update_analysis_status(analysis_result_id, status='complete', result_json=dummy_result)
        logger.info(f"[analysisResultId={analysis_result_id}] DB write success: status=complete")
        
        logger.info(f"[analysisResultId={analysis_result_id}] Job end: Successfully completed analysis")
        return {"status": "completed", "analysis_result_id": analysis_result_id}
        
    except Exception as e:
        logger.error(f"[analysisResultId={analysis_result_id}] Errors: Failed to process analysis: {e}")
        try:
            update_analysis_status(analysis_result_id, status='failed', error_message=str(e))
            logger.info(f"[analysisResultId={analysis_result_id}] DB write success: status=failed")
        except Exception as inner_e:
            logger.error(f"[analysisResultId={analysis_result_id}] Errors: Failed to update error status: {inner_e}")
        raise e
