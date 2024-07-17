import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "127.0.0.1", // 또는 원하는 IP 주소
    port: 5173, // 원하는 포트 번호
  },
});
