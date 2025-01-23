// https://vike.dev/data

import type { Movie, MovieDetails } from "../types.js";
import { useConfig } from "vike-react/useConfig";
import * as drizzleQueries from "../../database/drizzle/queries/userPrizes";

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async (pageContext) => {
	// https://vike.dev/useConfig
	const identifier = pageContext.req.ip || pageContext.req.useragent.source;
	const prizes = await drizzleQueries.getAllPrizesForUser(
		pageContext.db,
		identifier,
	);

	return prizes;
};

function minimize(movies: MovieDetails[]): Movie[] {
	return movies.map((movie) => {
		const { title, release_date, id } = movie;
		return { title, release_date, id };
	});
}
