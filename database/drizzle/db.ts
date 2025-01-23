import { Kysely, PostgresDialect } from "kysely";
import { NeonHTTPDialect } from "kysely-neon";
console.log(process.env.DATABASE_URL, import.meta?.env?.DATABASE_URL);
const dialect = new NeonHTTPDialect({
	connectionString: process.env.DATABASE_URL || import.meta.env.DATABASE_URL,
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<Database>({
	dialect,
});
