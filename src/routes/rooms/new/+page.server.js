import { db } from "$lib/server/db.js";
import { roomsTable } from "$lib/server/schema.js";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const topics = await db.query.topicsTable.findMany({
		columns: {
			id: true,
			name: true,
		},
	});

	return { topics };
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const form = Object.fromEntries(await request.formData());
		// console.log(form);
		// TODO: check for correct form data using zod

		const room = db
			.insert(roomsTable)
			.values({
				name: String(form.name),
				topicId: String(form.topic),
				description: String(form.description),
			})
			.returning()
			.get();

		console.log("created:", room);

		redirect(307, "/rooms");
	},
};
