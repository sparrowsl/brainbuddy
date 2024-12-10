import { db } from "$lib/server/db.js";
import { roomsTable, topicsTable } from "$lib/server/schema.js";
import { desc, eq, like } from "drizzle-orm";
import { nanoid } from "nanoid";

/** @type {import('./$types').PageServerLoad} */
export async function load({ url, locals }) {
	const searchedTopic = url.searchParams.get("topic") || "all";

	const getRooms = async () => {
		return db.query.topicsTable
			.findMany({
				where:
					searchedTopic !== "all"
						? like(topicsTable.name, `%${searchedTopic}%`)
						: undefined,
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
		user: locals.user,
		topics,
		rooms: getRooms(),
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	deleteRoom: async ({ request }) => {
		const { id } = /** @type {import("$lib/types").Room} */ (
			Object.fromEntries(await request.formData())
		);

		await db.delete(roomsTable).where(eq(roomsTable.id, id));
	},
};
