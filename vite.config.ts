import handlebars from 'vite-plugin-handlebars';
import path, {resolve} from 'path';
import vitePluginHandlebarsPrecompile from './vite-plugin-handlebars-precompile';
import eslintPlugin from "vite-plugin-eslint";
import svgr from "vite-plugin-svgr";
import { defineConfig } from 'vite';
export default defineConfig({
  plugins: [
    vitePluginHandlebarsPrecompile(),
    svgr(),
  ],
  build: {
    outDir: "./dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        dir: "./dist",
        format: "es",
      },
      external: ['/src/Navbar/navbar.ts',"/src/main.ts"]
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
