import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [
    react(),
    {
      name: 'serve-dev-html',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url) {
            // Strip /amplify-website/ prefix in dev mode if browser requests it from cache
            if (req.url.startsWith('/amplify-website/')) {
              req.url = req.url.replace('/amplify-website/', '/')
            } else if (req.url === '/amplify-website') {
              req.url = '/'
            }

            if (req.url === '/' || req.url === '/index.html') {
              req.url = '/index.dev.html'
            }
          }
          next()
        })
      },
    },
  ],
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'index.dev.html'),
    },
  },
  base: command === 'build' || mode === 'production' || process.env.NODE_ENV === 'production'
    ? '/amplify-website/'
    : '/',
}))
