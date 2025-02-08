export default {
	theme: {
		extend: {
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
