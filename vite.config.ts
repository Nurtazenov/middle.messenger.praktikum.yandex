/* eslint-disable no-undef */
import path from 'path';
import vitePluginHandlebarsPrecompile from './vite-plugin-handlebars-precompile.js';
import svgr from "vite-plugin-svgr";
import { defineConfig } from 'vite';
export default defineConfig ({
  plugins: [
    vitePluginHandlebarsPrecompile(),
    svgr(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['legacy-js-api'],
      }
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true
  }
}
);


