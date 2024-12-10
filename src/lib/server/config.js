import "dotenv/config";

export const config = (() => {
	// TODO: add zod validation
	if (String(process?.env?.DATABASE_URL).trim() === "") {
		throw Error("DATABASE_URL not found");
	}

	return {
		DATABASE_URL: process.env.DATABASE_URL,
	};
})();
