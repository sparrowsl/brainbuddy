import db from "$lib/server/db.js";
import { usersTable } from "$lib/server/schema.js";
import { eq } from "drizzle-orm";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const session = event.cookies.get("session");

	if (!session) return await resolve(event);

	// TODO: verify JWT payload / session

	const currentUser = await db.query.usersTable.findFirst({
		where: eq(usersTable.username, JSON.parse(String(session)).username),
		columns: {
			password: false,
		},
	});

	if (currentUser) event.locals.user = currentUser;

	return await resolve(event);
}
