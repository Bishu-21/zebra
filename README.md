# Zebra AI Monorepo

This is the production-ready monorepo for the Zebra AI SaaS application.

## Version Strategy

We explicitly pin the versions of critical frontend dependencies to ensure a stable and reproducible build across environments:

- **Next.js**: `15.0.0`
- **React**: `18.3.1`
- **React DOM**: `18.3.1`

By avoiding caret (`^`) or tilde (`~`) ranges for these core libraries, we prevent accidental breaking changes from upstream Release Candidates or major uncoordinated updates. Tailwind CSS is set to `^3.4.4` to allow minor styling patch updates securely within v3.

## Workspaces

- `apps/web`: Next.js frontend
- `services/worker`: FastAPI backend worker
- `packages/db`: Shared Drizzle ORM and schema
- `packages/types`: Shared TypeScript definitions
