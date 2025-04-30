import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'  // Assuming you have Tailwind set up as a Vite plugin

// https://vite.dev/config/
export default defineConfig({
  theme: {
    extend: {
      screens: {
        ultrawide: '2560px', // Define the custom ultrawide breakpoint
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(), // Make sure your tailwind.config.js is correctly configured
  ],
  base: '/',  // Correct for root deployments.  Good!
  server: {
    port: 5173, // Good.  You can change this if needed.
    hmr: {
      // Let Vite handle host and protocol.  Essential for Firebase emulators.
      // Don't add host, port, or protocol here.
    },
  },
})