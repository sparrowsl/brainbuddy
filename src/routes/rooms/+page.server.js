import db from "$lib/server/db.js";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const rooms = await db.query.roomsTable.findMany();

	return { rooms };
}
