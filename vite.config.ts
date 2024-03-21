import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "url";

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/api": "https://young-ocean-49769-86e356584f5f.herokuapp.com",
      "/upload": "https://young-ocean-49769-86e356584f5f.herokuapp.com",
    },
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
  },
});
