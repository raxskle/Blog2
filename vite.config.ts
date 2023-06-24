import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "./src/assets/mixin.scss";
        @import "./src/assets/base.scss";
        @import "./src/assets/theme.scss";
        `
      }
    }
  },
  server: {
    // host: "127.0.0.1",
    host: "10.21.207.126",
    port: 8082,
    open: true
  }
});
