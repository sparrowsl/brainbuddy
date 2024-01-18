import db from "$lib/server/db.js";
import { roomsTable } from "$lib/server/schema.js";
import { desc, eq } from "drizzle-orm";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const rooms = await db.query.roomsTable.findMany({
		orderBy: desc(roomsTable.created),
		with: {
			topic: {
				columns: {
					name: true,
				},
			},
			host: {
				columns: {
					username: true,
				},
			},
		},
	});

	// console.log(rooms);

	return { rooms };
}

/** @type {import('./$types').Actions} */
export const actions = {
	deleteRoom: async ({ request }) => {
		const { roomId } = Object.fromEntries(await request.formData());

		await db.delete(roomsTable).where(eq(roomsTable.id, String(roomId)));
	},
};
