import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // This is to allow the use of /auth directly in the frontend code
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5200",
        secure: false,
      },
    },
  },
  plugins: [react()],
});
