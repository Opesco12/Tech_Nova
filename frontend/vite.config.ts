import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Proxy `/strapi` to the remote Strapi instance during development
      // so the browser requests go to the Vite dev server (same origin)
      // avoiding CORS issues.
      '/strapi': {
        target: 'https://fruitful-appliance-ba347b6e40.strapiapp.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/strapi/, ''),
      },
    },
  },
})
