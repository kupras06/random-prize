// import { todoTable } from "../schema/user";0
import { db } from "../db";
import type { NewUserPrize } from "../schema/UserPrize";

export function insertUserPize(
	db: ReturnType<typeof dbSqlite>,
	payload: NewUserPrize,
) {
	return db.insertInto("user_prizes").values(payload).executeTakeFirst();
}

export async function getAllPrizes(db: ReturnType<typeof dbSqlite>) {
	const query = db.selectFrom("user_prizes");
	return await query.selectAll().execute();
}
export async function getAllPrizesForUser(
	db: ReturnType<typeof dbSqlite>,
	identifier: string,
) {
	const query = db
		.selectFrom("user_prizes")
		.where("identifier", "=", identifier)
		.orderBy("id", "desc");
	return await query.selectAll().execute();
}
