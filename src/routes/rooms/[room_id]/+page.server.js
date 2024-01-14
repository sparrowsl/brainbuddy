import db from "$lib/server/db.js";
import { roomsTable } from "$lib/server/schema.js";
import { eq } from "drizzle-orm";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const room = await db.query.roomsTable.findFirst({
		where: eq(roomsTable.id, params.room_id),
		with: {
			messages: true,
		},
	});

	return { room };
}
