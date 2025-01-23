import type { dbSqlite } from "./database/drizzle/db";

declare module "telefunc" {
	namespace Telefunc {
		interface Context {
			db: ReturnType<typeof dbSqlite>;
		}
	}
}

declare global {
	namespace Vike {
		interface PageContext {
			db: ReturnType<typeof dbSqlite>;
		}
	}
}

// biome-ignore lint/complexity/noUselessEmptyExport: ensure that the file is considered as a module
export {};
