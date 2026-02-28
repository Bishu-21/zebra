"use client";

import { useState, useEffect } from "react";

export default function DemoClient() {
    const [userId, setUserId] = useState("4f81f77f-c4de-4a19-b3bf-25d801d4084d"); // Dummy user ID for demo
    const [resumeId, setResumeId] = useState("");
    const [analysisId, setAnalysisId] = useState("");
    const [status, setStatus] = useState("Not started");
    const [resultData, setResultData] = useState<any>(null);

    const createResumeAndVersion = async () => {
        setStatus("Creating resume container...");
        try {
            // 1. Create resume container
            const res1 = await fetch("/api/resumes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, title: "Demo Resume" }),
            });
            const data1 = await res1.json();
            const newResumeId = data1.resumeId;
            setResumeId(newResumeId);

            setStatus("Creating version and triggering pipeline...");
            // 2. Create version, which triggers analysis
            const res2 = await fetch(`/api/resumes/${newResumeId}/versions`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: "Here is my demo resume content." }),
            });
            const data2 = await res2.json();

            setAnalysisId(data2.analysisResultId);
            setStatus(data2.status);
        } catch (err) {
            console.error(err);
            setStatus("Error starting pipeline.");
        }
    };

    useEffect(() => {
        let isCancelled = false;
        let timeout: NodeJS.Timeout;

        const pollStatus = async () => {
            let attempt = 0;
            let errorCount = 0;
            const startTime = Date.now();
            let pollInterval = 2000;

            console.log(`[Polling] Started polling for analysisId: ${analysisId}`);

            const poll = async () => {
                if (isCancelled) {
                    console.log(`[Polling] Polling cancelled for analysisId: ${analysisId}`);
                    return;
                }

                if (Date.now() - startTime > 60000) {
                    console.log(`[Polling] Timeout reached after 60s for analysisId: ${analysisId}`);
                    setStatus("failed (timeout)");
                    return;
                }

                if (errorCount >= 5) {
                    console.log(`[Polling] Stopped after 5 consecutive errors for analysisId: ${analysisId}`);
                    setStatus("failed (errors)");
                    return;
                }

                attempt++;
                try {
                    console.log(`[Polling] Attempt ${attempt} (after ${Date.now() - startTime}ms)`);
                    const res = await fetch(`/api/analysis/${analysisId}`);
                    if (res.ok) {
                        errorCount = 0; // Reset error count on success
                        pollInterval = 2000; // Reset interval
                        const data = await res.json();
                        setStatus(data.status);

                        if (data.status === "complete" || data.status === "failed") {
                            console.log(`[Polling] Finished with status: ${data.status}`);
                            setResultData(data);
                            return; // Stop polling
                        }
                    } else {
                        throw new Error(`HTTP ${res.status}`);
                    }
                } catch (err) {
                    errorCount++;
                    console.error(`[Polling] Error (Count: ${errorCount}):`, err);
                    pollInterval *= 1.5; // Exponential backoff
                }

                // Schedule next poll
                timeout = setTimeout(poll, pollInterval);
            };

            poll();
        };

        // Poll the status if we have a valid analysisId
        // The effect only re-runs if `analysisId` changes, which prevents resetting the timeout
        if (analysisId) {
            pollStatus();
        }

        return () => {
            isCancelled = true;
            if (timeout) clearTimeout(timeout);
        };
    }, [analysisId]);

    return (
        <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
            <h1>Resume Ingestion Pipeline Demo</h1>

            <div style={{ marginBottom: "1rem" }}>
                <button onClick={createResumeAndVersion} disabled={status === "processing" || status === "pending"}>
                    Trigger Pipeline
                </button>
            </div>

            <div>
                <p><strong>Resume ID:</strong> {resumeId || "None"}</p>
                <p><strong>Analysis ID:</strong> {analysisId || "None"}</p>
                <p><strong>Pipeline Status:</strong> {status}</p>
            </div>

            {resultData && (
                <div style={{ marginTop: "2rem" }}>
                    <h2>Pipeline Output</h2>
                    <pre style={{ background: "#eee", padding: "1rem" }}>
                        {JSON.stringify(resultData, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}
