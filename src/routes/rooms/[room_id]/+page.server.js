import { db } from "$lib/server/db.js";
import { messagesTable, roomsTable } from "$lib/server/schema.js";
import { desc, eq } from "drizzle-orm";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	/** @param {string} roomId */
	const getRoomComments = async (roomId) => {
		return db.query.messagesTable.findMany({
			where: eq(messagesTable.roomId, roomId),
			orderBy: desc(messagesTable.created),
			with: {
				user: {
					columns: {
						id: true,
						username: true,
					},
				},
			},
		});
	};

	const room = await db.query.roomsTable.findFirst({
		where: eq(roomsTable.id, params.room_id),
		with: {
			host: {
				columns: {
					id: true,
					username: true,
					// email: true,
				},
			},
			topic: true,
		},
	});

	return {
		room,
		comments: getRoomComments(params.room_id),
	};
}
