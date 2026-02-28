import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL || 'postgres://zebra:zebra@localhost:5434/zebra';

// Use a singleton instance to avoid exhausting connections in local dev / Next.js Fast Refresh
const globalForDb = globalThis as unknown as {
    conn: postgres.Sql | undefined;
};

// Create a connection with retry logic for initial container startup timing
function createDbConnection() {
    console.log('⏳ Connecting to Postgres...');
    const maxConnections = process.env.NODE_ENV === 'production' ? 10 : 1;

    const sql = postgres(connectionString, {
        max: maxConnections,
        idle_timeout: 20
    });

    // Quick ping to check connection (optional but helps surface errors early)
    sql`SELECT 1`.then(() => {
        console.log('✅ Connected to Postgres database');
    }).catch((err) => {
        console.warn('⚠️ Postgres initial connection check failed. Will retry on queries. Error:', err.message);
    });

    return sql;
}

const conn = globalForDb.conn ?? createDbConnection();
if (process.env.NODE_ENV !== 'production') globalForDb.conn = conn;

export const db = drizzle(conn, { schema });

export * from './schema';
