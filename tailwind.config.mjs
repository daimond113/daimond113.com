import defaultTheme from "tailwindcss/defaultTheme"

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				body: {
					bg: "#08060e",
					text: "#d2bcff",
					link: "#b18aff",
				},
				logo: {
					text: "#DCCCFF",
				},
				alt: {
					text: "#a68cd9",
				},
			},
			width: {
				content: "60rem",
			},
			maxWidth: {
				content: "60rem",
			},
			fontFamily: {
				sans: ["'DM Sans Variable'", ...defaultTheme.fontFamily.sans],
			},
			typography: ({ theme }) => ({
				main: {
					css: {
						"--tw-prose-body": theme("colors.body.text"),
						"--tw-prose-headings": theme("colors.body.text"),
						"--tw-prose-lead": theme("colors.violet[100]"),
						"--tw-prose-links": theme("colors.body.link"),
						"--tw-prose-bold": theme("colors.violet[400]"),
						"--tw-prose-counters": theme("colors.violet[300]"),
						"--tw-prose-bullets": theme("colors.violet[300]"),
						"--tw-prose-hr": theme("colors.violet[100]"),
						"--tw-prose-quotes": theme("colors.violet[400]"),
						"--tw-prose-quote-borders": theme("colors.violet[400]"),
						"--tw-prose-captions": theme("colors.violet[300]"),
						"--tw-prose-th-borders": theme("colors.violet[300]"),
						"--tw-prose-td-borders": theme("colors.violet[300]"),
						"--tw-prose-code": theme("colors.alt.text"),
						"--tw-prose-kbd": theme("colors.alt.text"),
						"--tw-prose-lead": theme("colors.alt.text"),
					},
				},
			}),
		},
	},
	plugins: [require("@tailwindcss/typography")],
}
