import db from "$lib/server/db.js";
import { roomsTable, topicsTable } from "$lib/server/schema.js";
import { desc, eq, ilike, sql } from "drizzle-orm";

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
	const getRooms = async () => {
		return db.query.roomsTable.findMany({
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
	};

	const topics = await db.query.topicsTable.findMany({
		orderBy: desc(topicsTable.created),
	});

	return {
		topics,
		rooms: getRooms(),
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	deleteRoom: async ({ request }) => {
		const { roomId } = Object.fromEntries(await request.formData());

		await db.delete(roomsTable).where(eq(roomsTable.id, String(roomId)));
	},
};
