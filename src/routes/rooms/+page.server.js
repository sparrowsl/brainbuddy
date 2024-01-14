import db from "$lib/server/db.js";
import { roomsTable } from "$lib/server/schema.js";
import { desc } from "drizzle-orm";

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
