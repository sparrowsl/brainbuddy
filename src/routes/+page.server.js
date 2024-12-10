import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').Actions} */
export const actions = {
	logout: ({ cookies }) => {
		cookies.delete("session", {
			path: "/",
			expires: new Date(0),
			sameSite: "strict",
			httpOnly: true,
		});

		redirect(307, "/rooms");
	},
};
