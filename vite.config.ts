import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@/core": path.resolve("./src/lib/core"),
      "@/stores": path.resolve("./src/lib/stores"),
      "@/components": path.resolve("./src/lib/components"),
      "@/util": path.resolve("./src/lib/util"),
    },
  },
  plugins: [svelte()],
})
