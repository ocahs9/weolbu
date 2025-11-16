import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), vanillaExtractPlugin()],
	resolve: {
		alias: [
			{ find: "@apis", replacement: "/src/apis" },
			{ find: "@assets", replacement: "/src/assets" },
			{ find: "@pages", replacement: "/src/pages" },
			{ find: "@providers", replacement: "/src/providers" },
			{ find: "@routes", replacement: "/src/routes" },
			{ find: "@shared", replacement: "/src/shared" },
			{ find: "@styles", replacement: "/src/styles" },
		],
	},
});
