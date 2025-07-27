import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "build",
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "index.html"), // popup UI
        background: resolve(__dirname, "src/background/background.ts"), // service worker
        content: resolve(__dirname, "src/content/content.ts"), // content script
      },
      output: {
        entryFileNames: "src/[name]/[name].js", // control file output paths
      },
    },
  },
  publicDir: "public", // for icon.png etc.
});
