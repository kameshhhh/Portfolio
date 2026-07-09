import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'https://portfolio-production-897d.up.railway.app',
      '/uploads': 'https://portfolio-production-897d.up.railway.app'
    }
  }
});
