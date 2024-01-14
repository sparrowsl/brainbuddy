import db from "$lib/server/db.js";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const topics = await db.query.topicsTable.findMany({
		columns: {
			id: true,
			name: true,
		},
	});

	return { topics };
}
