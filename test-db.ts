import postgres from 'postgres';

const sql = postgres('postgres://zebra:zebra@127.0.0.1:5434/zebra');

async function test() {
    try {
        const res = await sql`SELECT 1 as result`;
        console.log("Connected successfully:", res);
    } catch (e) {
        console.error("Connection failed:", e);
    } finally {
        await sql.end();
    }
}
test();
