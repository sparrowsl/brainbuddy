import db from "$lib/server/db.js";
import { roomsTable } from "$lib/server/schema.js";
import { redirect } from "@sveltejs/kit";
import dayjs from "dayjs";
import { eq } from "drizzle-orm";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const getRoom = () => {
		return db.query.roomsTable.findFirst({
			where: eq(roomsTable.id, params.room_id),
		});
	};

	const getTopics = () => db.query.topicsTable.findMany();

	// console.log(room);
	return {
		room: await getRoom(),
		topics: await getTopics(),
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, params }) => {
		const form = Object.fromEntries(await request.formData());
		// console.log(form);
		// TODO: check for correct form data using zod

		const room = db
			.update(roomsTable)
			.set({
				name: String(form.name),
				topicId: String(form.topic),
				description: String(form.description),
				updated: dayjs().format(),
			})
			.where(eq(roomsTable.id, params.room_id))
			.returning()
			.get();

		console.log(room);

		redirect(307, "/rooms");
	},
};
