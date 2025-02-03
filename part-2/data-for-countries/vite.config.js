import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      protocol: 'ws',  // Set the protocol to WebSocket
      host: 'localhost',  // Make sure it's set to localhost or your correct host
    },
    port: 5173,  // Ensure Vite runs on this port or change it if needed
  },
})
