import { resolve } from "path";
import { defineConfig } from "vite";
import UnoCSS from "unocss/vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [UnoCSS(), react(), dts()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "AM",
      fileName: "amber-material",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
    },
  },
});
