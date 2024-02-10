import db from "$lib/server/db.js";
import { usersTable } from "$lib/server/schema.js";
import { redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, cookies }) => {
		const form = Object.fromEntries(await request.formData());

		// TODO: validate the form input

		// Check if username exists in database
		const user = await db.query.usersTable.findFirst({
			where: eq(usersTable.username, String(form.username)),
			columns: {
				created: false,
				updated: false,
			},
		});

		if (!user) {
			return {
				errors: { message: "Invalid Username and Password!!" },
			};
		}
		// TODO: check hashed password using bcrypt

		// Set session cookies for the user
		cookies.set("session", user.id, {
			path: "/",
			httpOnly: true,
			maxAge: 24 * 24 * 60 * 7,
		});

		redirect(307, "/rooms");
	},
};
