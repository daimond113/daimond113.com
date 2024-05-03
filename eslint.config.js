import tsEslint from "typescript-eslint"

import eslintPluginAstro from "eslint-plugin-astro"
import eslintPluginPrettier from "eslint-plugin-prettier/recommended"
import eslintConfigPrettier from "eslint-config-prettier"
import eslintPluginTailwindcss from "eslint-plugin-tailwindcss"

export default [
	...tsEslint.configs.recommended,
	...eslintPluginAstro.configs["flat/recommended"],
	eslintPluginPrettier,
	eslintConfigPrettier,
	{
		name: "tailwindcss:base",
		plugins: {
			get tailwindcss() {
				return eslintPluginTailwindcss
			},
		},
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
	},
	{
		name: "tailwindcss:rules",
		rules: {
			"tailwindcss/classnames-order": "warn",
			"tailwindcss/enforces-negative-arbitrary-values": "warn",
			"tailwindcss/enforces-shorthand": "warn",
			"tailwindcss/migration-from-tailwind-2": "warn",
			"tailwindcss/no-arbitrary-value": "off",
			"tailwindcss/no-custom-classname": [
				"warn",
				{
					whitelist: ["widthless", "lead", "rainbow"],
				},
			],
			"tailwindcss/no-contradicting-classname": "error",
			"tailwindcss/no-unnecessary-arbitrary-value": "warn",
		},
	},
	{
		files: ["**/*.ts", "**/*.tsx"],
		languageOptions: {
			parser: tsEslint.parser,
		},
	},
	{
		plugins: {
			"@typescript-eslint": tsEslint.plugin,
		},
	},
]
