export type UserContext = {
    id: string;
    email: string;
    role: 'admin' | 'user';
};

export type JobStatus = 'queued' | 'processing' | 'completed' | 'failed';

export interface ProcessDocumentJobPayload {
    documentId: string;
    userId: string;
}
