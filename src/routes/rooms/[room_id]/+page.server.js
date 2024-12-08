import { db } from "$lib/server/db.js";
import { messagesTable, roomsTable } from "$lib/server/schema.js";
import { desc, eq } from "drizzle-orm";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	// biome-ignore lint/nursery/useAwait: <explanation>
	const getRoomComments = async () => {
		return db.query.messagesTable.findMany({
			where: eq(messagesTable.roomId, params.room_id),
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
					email: true,
				},
			},
			topic: {
				columns: {
					id: true,
					name: true,
				},
			},
		},
	});

	return {
		room,
		comments: getRoomComments(),
	};
}
