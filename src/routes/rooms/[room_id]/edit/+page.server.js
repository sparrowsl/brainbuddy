import { db } from "$lib/server/db.js";
import { roomsTable } from "$lib/server/schema.js";
import { redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals }) {
	if (!locals.user) {
		redirect(302, `/rooms/${params.room_id}`);
	}

	const getRoom = () => {
		return db.query.roomsTable.findFirst({
			where: eq(roomsTable.id, params.room_id),
		});
	};

	const getTopics = () => db.query.topicsTable.findMany();

	const [room, topics] = await Promise.all([getRoom(), getTopics()]);

	if (room?.host !== locals.user.id) {
		redirect(307, `/rooms/${params.room_id}`);
	}

	return {
		room,
		topics,
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, params }) => {
		const form = /** @type {import("$lib/types").Room} */ (
			Object.fromEntries(await request.formData())
		);

		// TODO: check for correct form data using zod

		const room = db
			.update(roomsTable)
			.set({
				name: form.name,
				topicId: form.topicId,
				description: form.description,
			})
			.where(eq(roomsTable.id, params.room_id))
			.returning()
			.get();

		redirect(307, `/rooms/${room?.id}`);
	},
};
