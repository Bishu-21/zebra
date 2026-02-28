import { pgTable, text, timestamp, uuid, pgEnum, jsonb, integer, AnyPgColumn } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const pipelineStatusEnum = pgEnum('pipeline_status', ['pending', 'processing', 'complete', 'failed']);

// Tables
export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    email: text('email').notNull().unique(),
    name: text('name'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const resumes = pgTable('resumes', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => users.id).notNull(),
    title: text('title').notNull(),
    currentVersionId: uuid('current_version_id').references((): AnyPgColumn => resumeVersions.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const resumeVersions = pgTable('resume_versions', {
    id: uuid('id').defaultRandom().primaryKey(),
    resumeId: uuid('resume_id').references(() => resumes.id).notNull(),
    content: text('content').notNull(), // Assuming markdown or raw text
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const jobTargets = pgTable('job_targets', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => users.id).notNull(),
    roleTitle: text('role_title').notNull(),
    companyName: text('company_name'),
    jobDescription: text('job_description').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const analysisResults = pgTable('analysis_results', {
    id: uuid('id').defaultRandom().primaryKey(),
    resumeVersionId: uuid('resume_version_id').references(() => resumeVersions.id).notNull(),
    jobTargetId: uuid('job_target_id').references(() => jobTargets.id),
    status: pipelineStatusEnum('status').default('pending').notNull(),
    resultJson: jsonb('result_json'),
    errorMessage: text('error_message'),
    processingDurationMs: integer('processing_duration_ms'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const rewriteOutputs = pgTable('rewrite_outputs', {
    id: uuid('id').defaultRandom().primaryKey(),
    resumeVersionId: uuid('resume_version_id').references(() => resumeVersions.id).notNull(),
    jobTargetId: uuid('job_target_id').references(() => jobTargets.id).notNull(),
    status: pipelineStatusEnum('status').default('pending').notNull(),
    contentJson: jsonb('content_json'),
    errorMessage: text('error_message'),
    processingDurationMs: integer('processing_duration_ms'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
    resumes: many(resumes),
    jobTargets: many(jobTargets),
}));

export const resumesRelations = relations(resumes, ({ one, many }) => ({
    user: one(users, {
        fields: [resumes.userId],
        references: [users.id],
    }),
    versions: many(resumeVersions),
    currentVersion: one(resumeVersions, {
        fields: [resumes.currentVersionId],
        references: [resumeVersions.id],
    }),
}));

export const resumeVersionsRelations = relations(resumeVersions, ({ one, many }) => ({
    resume: one(resumes, {
        fields: [resumeVersions.resumeId],
        references: [resumes.id],
    }),
    analysisResults: many(analysisResults),
    rewriteOutputs: many(rewriteOutputs),
}));

export const jobTargetsRelations = relations(jobTargets, ({ one, many }) => ({
    user: one(users, {
        fields: [jobTargets.userId],
        references: [users.id],
    }),
    analysisResults: many(analysisResults),
    rewriteOutputs: many(rewriteOutputs),
}));

export const analysisResultsRelations = relations(analysisResults, ({ one }) => ({
    resumeVersion: one(resumeVersions, {
        fields: [analysisResults.resumeVersionId],
        references: [resumeVersions.id],
    }),
    jobTarget: one(jobTargets, {
        fields: [analysisResults.jobTargetId],
        references: [jobTargets.id],
    }),
}));

export const rewriteOutputsRelations = relations(rewriteOutputs, ({ one }) => ({
    resumeVersion: one(resumeVersions, {
        fields: [rewriteOutputs.resumeVersionId],
        references: [resumeVersions.id],
    }),
    jobTarget: one(jobTargets, {
        fields: [rewriteOutputs.jobTargetId],
        references: [jobTargets.id],
    }),
}));
