import db from "$lib/server/db.js";
import { usersTable } from "$lib/server/schema.js";
import { redirect } from "@sveltejs/kit";
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
		const form = /** @type {{name:string, username:string, password:string}} */ (
			Object.fromEntries(await request.formData())
		);

		// TODO: validate the form input

		// Check if username exists in database
		const user = await db.query.usersTable.findFirst({
			where: eq(usersTable.username, String(form.username)),
		});

		if (user) {
			return {
				errors: { message: "Invalid Username and Password!!" },
			};
		}

		// TODO: hashed password using bcrypt before saving
		// Save the new user data in the database
		const newUser = db
			.insert(usersTable)
			.values({
				name: form.name,
				username: form.username,
				password: form.password,
			})
			.returning()
			.get();

		// Set session cookies for the user
		cookies.set("session", newUser.id, {
			path: "/",
			httpOnly: true,
			maxAge: 24 * 24 * 60 * 7,
		});

		redirect(307, "/rooms");
	},
};
