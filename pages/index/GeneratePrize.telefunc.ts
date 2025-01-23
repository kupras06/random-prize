import * as drizzleQueries from "../../database/drizzle/queries/userPrizes";
import { getContext } from "telefunc";
const generatePrize = () => {
	const rand = Math.random() * 100;
	if (rand >= 75) return "rare";
	if (rand >= 50) return "special";
	return "regular";
};

export async function onGenerateUserPrize() {
	const context = getContext();
	const identifier = context.req?.ip || context.req?.useragent?.source;
	const prizeType = generatePrize();
	if (identifier)
		await drizzleQueries.insertUserPize(context.db, { prizeType, identifier });
	const prizes = await drizzleQueries.getAllPrizesForUser(
		context.db,
		identifier,
	);
	return prizes;
}
