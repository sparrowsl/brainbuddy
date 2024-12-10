import { db } from "$lib/server/db.js";
import { usersTable } from "$lib/server/schema.js";
import { eq } from "drizzle-orm";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const session = event.cookies.get("session");

	if (!session) {
		return await resolve(event);
	}

	// TODO: verify JWT payload / session

	const user = await db.query.usersTable.findFirst({
		where: eq(usersTable.id, session),
		columns: {
			password: false,
			email: false,
			created: false,
			updated: false,
		},
	});

	if (user) {
		event.locals.user = user;
	}

	return await resolve(event);
}
