import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"

export default defineConfig({
	site: "https://www.daimond113.com",
	markdown: {
		shikiConfig: {
			theme: "dracula",
		},
	},
	integrations: [mdx(), sitemap(), tailwind()],
})
