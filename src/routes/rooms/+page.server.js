import db from "$lib/server/db.js";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const rooms = await db.query.roomsTable.findMany({
		with: {
			messages: true,
			topic: true,
			host: true,
		},
	});

	// console.log(rooms);

	return { rooms };
}
