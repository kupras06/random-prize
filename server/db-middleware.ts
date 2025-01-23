import type { Get, UniversalMiddleware } from "@universal-middleware/core";
import { db } from "../database/drizzle/db";

declare global {
	namespace Universal {
		interface Context {
			db: ReturnType<typeof db>;
		}
	}
}

// Add `db` to the Context
export const dbMiddleware: Get<[], UniversalMiddleware> =
	() => async (_request, context, _runtime) => {
		return {
			...context,
			db: db,
		};
	};
