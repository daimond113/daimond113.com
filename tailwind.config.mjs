import defaultTheme from "tailwindcss/defaultTheme"

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				body: {
					bg: {
						DEFAULT: "#d5c7ff",
						dark: "#08060e",
					},
					text: {
						DEFAULT: "#461C9C",
						dark: "#d2bcff",
					},
					link: {
						DEFAULT: "#043279",
						dark: "#b18aff",
					},
				},
				logo: {
					text: {
						DEFAULT: "#29186A",
						dark: "#DBADFF",
					},
				},
				alt: {
					text: {
						DEFAULT: "#140531",
						dark: "#a68cd9",
					},
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
						"--tw-prose-body": theme("colors.body.text.DEFAULT"),
						"--tw-prose-headings": theme("colors.body.text.DEFAULT"),
						"--tw-prose-lead": theme("colors.violet[700]"),
						"--tw-prose-links": theme("colors.body.link.DEFAULT"),
						"--tw-prose-bold": theme("colors.violet[400]"),
						"--tw-prose-counters": theme("colors.violet[800]"),
						"--tw-prose-bullets": theme("colors.violet[800]"),
						"--tw-prose-hr": theme("colors.violet[100]"),
						"--tw-prose-quotes": theme("colors.violet[400]"),
						"--tw-prose-quote-borders": theme("colors.violet[400]"),
						"--tw-prose-captions": theme("colors.violet[800]"),
						"--tw-prose-th-borders": theme("colors.violet[800]"),
						"--tw-prose-td-borders": theme("colors.violet[800]"),
						"--tw-prose-code": theme("colors.alt.text.DEFAULT"),
						"--tw-prose-kbd": theme("colors.alt.text.DEFAULT"),
					},
				},
				dark: {
					css: {
						"--tw-prose-body": theme("colors.body.text.dark"),
						"--tw-prose-headings": theme("colors.body.text.dark"),
						"--tw-prose-lead": theme("colors.violet[400]"),
						"--tw-prose-links": theme("colors.body.link.dark"),
						"--tw-prose-bold": theme("colors.violet[400]"),
						"--tw-prose-counters": theme("colors.violet[300]"),
						"--tw-prose-bullets": theme("colors.violet[300]"),
						"--tw-prose-hr": theme("colors.violet[100]"),
						"--tw-prose-quotes": theme("colors.violet[400]"),
						"--tw-prose-quote-borders": theme("colors.violet[400]"),
						"--tw-prose-captions": theme("colors.violet[300]"),
						"--tw-prose-th-borders": theme("colors.violet[300]"),
						"--tw-prose-td-borders": theme("colors.violet[300]"),
						"--tw-prose-code": theme("colors.alt.text.dark"),
						"--tw-prose-kbd": theme("colors.alt.text.dark"),
					},
				},
			}),
		},
	},
	plugins: [require("@tailwindcss/typography")],
}
