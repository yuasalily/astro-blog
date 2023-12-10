/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				mycolor: {
					100: "#ababab",
					300: "#cdcdcd",
					500: "#efefef"
				},
				myblack: "#0909090"
			}
		},
		fontFamily: {
			hachimaru:['Hachi Maru Pop']

		}
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
