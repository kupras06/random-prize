// We use Telefunc (https://telefunc.com) for data mutations. Being able to use Telefunc for fetching initial data is work-in-progress (https://vike.dev/data-fetching#tools).

import * as drizzleQueries from "../../database/drizzle/queries/todos";
import { getContext } from "telefunc";

export async function onNewTodo({ text }: { text: string }) {
  const context = getContext();
  await drizzleQueries.insertTodo(context.db, text);
}
