import db from "$lib/server/db.js";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const rooms = await db.query.roomsTable.findMany({
		with: {
			// messages: {
			// 	with: {
			// 		user: {
			// 			columns: {
			// 				username: true,
			// 			},
			// 		},
			// 	},
			// },
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
