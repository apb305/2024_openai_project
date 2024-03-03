import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://two024-openai-project-backend.onrender.com',
      ChangeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
})
