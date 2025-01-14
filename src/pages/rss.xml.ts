import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import { SITE_TITLE, BLOG_TAGLINE } from "../consts"
import type { APIRoute } from "astro"

export const GET: APIRoute = async ({ site }) => {
	if (!site) {
		throw new Error("No site data available")
	}

	const posts = await getCollection("blog")
	posts.sort(
		(a, b) =>
			(b.data.updatedDate ?? b.data.pubDate).getTime() -
			(a.data.updatedDate ?? a.data.pubDate).getTime(),
	)

	return rss({
		title: SITE_TITLE,
		description: BLOG_TAGLINE,
		site,
		customData: "<language>en-gb</language>",
		items: posts.map((post) => ({
			...post.data,
			customData: post.data.updatedDate
				? `<lastBuildDate>${post.data.updatedDate.toUTCString()}</lastBuildDate>`
				: "",
			link: `/blog/${post.id}/`,
		})),
	})
}
