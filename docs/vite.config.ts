import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dir = dirname(fileURLToPath(import.meta.url));

// Post-build emission (per-route head tags + prerendered bodies) lives in
// scripts/prerender.tsx, run by the `build` script after `vite build`.
export default defineConfig({
  root: __dir,
  base: "/",
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,
  },
  server: { port: 5177 },
});
