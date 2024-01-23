import db from "$lib/server/db.js";
import { roomsTable, topicsTable } from "$lib/server/schema.js";
import { desc, eq } from "drizzle-orm";
import { nanoid } from "nanoid";

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
	const searchedTopic = url.searchParams.get("topic") || "all";

	const getRooms = async () => {
		return db.query.topicsTable
			.findMany({
				where:
					searchedTopic !== "all"
						? eq(topicsTable.name, searchedTopic)
						: () => undefined,
				columns: {},
				with: {
					rooms: {
						columns: {
							topicId: false,
						},
						with: {
							host: true,
							topic: true,
						},
					},
				},
			})
			.then((topics) => topics.flatMap((topic) => topic.rooms));
	};

	const topics = await db.query.topicsTable.findMany({
		orderBy: desc(topicsTable.created),
		columns: {
			name: true,
			id: true,
		},
	});
	topics.unshift({ id: nanoid(), name: "all" });

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
