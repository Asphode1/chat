import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: '/chat/',
	css: {
		postcss: {
			plugins: [autoprefixer({}), tailwindcss({})],
		},
	},
})
