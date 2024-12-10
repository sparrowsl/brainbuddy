import { db } from "$lib/server/db.js";
import { usersTable } from "$lib/server/schema.js";
import { fail, redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

/** @type {import('./$types').PageServerLoad} */
export function load({ locals }) {
	if (locals.user) {
		redirect(307, "/rooms");
	}
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, cookies }) => {
		const form = /** @type {import("$lib/types").User} */ (
			Object.fromEntries(await request.formData())
		);

		// TODO: validate the form input

		// Check if username exists in database
		const user = await db.query.usersTable.findFirst({
			where: eq(usersTable.username, form.username),
			columns: {
				id: true,
				password: true,
			},
		});

		if (!user) {
			console.log({ user });
			return fail(400, { error: "invalid username and password!!" });
		}
		// TODO: check hashed password using bcrypt

		// Set session cookies for the user
		cookies.set("session", user.id, {
			path: "/",
			sameSite: "strict",
			httpOnly: true,
			maxAge: 24 * 24 * 60 * 7,
		});

		redirect(307, "/rooms");
	},
};
