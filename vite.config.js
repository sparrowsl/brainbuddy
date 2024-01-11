import { sveltekit } from "@sveltejs/kit/vite";
import unocss from "unocss/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [sveltekit(), unocss()],
	test: {
		include: ["tests/**/*.{test,spec}.{js,ts}"],
	},
});
