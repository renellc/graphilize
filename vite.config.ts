import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@/core": path.resolve("./src/lib/core"),
      "@/stores": path.resolve("./src/stores"),
    },
  },
  plugins: [svelte()],
})
