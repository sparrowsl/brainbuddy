import { db } from "$lib/server/db.js";
import { roomsTable } from "$lib/server/schema.js";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	if (!locals.user) {
		redirect(307, "/rooms");
	}

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
	default: async ({ request, locals }) => {
		const form = /** @type {import("$lib/types").Room} */ (
			Object.fromEntries(await request.formData())
		);
		// TODO: check for correct form data using zod

		const room = db
			.insert(roomsTable)
			.values({
				name: form.name,
				topicId: form.topicId,
				host: locals.user.id,
				description: form.description,
			})
			.returning()
			.get();

		redirect(307, `/rooms/${room.id}`);
	},
};
