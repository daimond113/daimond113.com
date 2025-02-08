import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwind from "@tailwindcss/vite"

export default defineConfig({
	site: "https://www.daimond113.com",
	markdown: {
		shikiConfig: {
			theme: "dracula",
		},
	},
	vite: {
		plugins: [tailwind()],
	},
	integrations: [mdx(), sitemap()],
})
