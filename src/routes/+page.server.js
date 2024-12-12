import { redirect } from "@sveltejs/kit";
import { db } from "$lib/server/db.js";
import { roomsTable, topicsTable } from "$lib/server/schema.js";
import { fail } from "@sveltejs/kit";
import { desc, eq, like } from "drizzle-orm";

/** @type {import('./$types').PageServerLoad} */
export async function load({ url, locals }) {
	const selectedTopic = url.searchParams.get("topic") || "all";

	const getRooms = async () => {
		return db.query.topicsTable
			.findMany({
				where:
					selectedTopic !== "all"
						? like(topicsTable.name, `%${selectedTopic}%`)
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

	return {
		user: locals.user,
		topics,
		rooms: getRooms(),
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	deleteRoom: async ({ request, locals }) => {
		const { id, hostId } =
			/** @type {import("$lib/types").Room & {hostId: string}} */ (
				Object.fromEntries(await request.formData())
			);

		if (locals.user.id !== hostId) {
			return fail(403, { error: "You are not authorized to delete this room" });
		}

		db.delete(roomsTable).where(eq(roomsTable.id, id)).execute();
	},

	logout: ({ cookies }) => {
		cookies.delete("session", {
			path: "/",
			expires: new Date(0),
			sameSite: "strict",
			httpOnly: true,
		});

		redirect(307, "/");
	},
};
