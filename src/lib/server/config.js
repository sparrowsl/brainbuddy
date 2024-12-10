import "dotenv/config";
import { z } from "zod";

const configSchema = z.object({
	DATABASE_URL: z
		.string({ required_error: "DATABASE_URL is required" })
		.trim()
		.min(5, { message: "DATABASE_URL is invalid" }),
	JWT_SECRET_KEY: z
		.string({ required_error: "JWT_SECRET_KEY is required" })
		.trim()
		.min(5, { message: "JWT_SECRET_KEY is invalid" }),
});

export const config = (function () {
	const { data, error, success } = configSchema.safeParse(process.env);

	if (!success) {
		const errors = error.flatten().fieldErrors;
		const firstError = Object.values(errors).flat().at(0);
		throw Error(firstError, { cause: firstError });
	}

	return data;
})();
