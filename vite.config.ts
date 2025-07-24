import handlebars from 'vite-plugin-handlebars';
import path, {resolve} from 'path';
import vitePluginHandlebarsPrecompile from './vite-plugin-handlebars-precompile';
import eslintPlugin from "vite-plugin-eslint";
import svgr from "vite-plugin-svgr";
export default {
  plugins: [
    eslintPlugin({
      include: ["/**/*.ts", "/**/*.js", "/**/*.hbs"],
    }),
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
    }),
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
    outDir: "./dist",
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
      output: {
        dir: "./dist",
        format: "es",
      },
      external: ['/src/Navbar/navbar.ts',"/src/main.ts"]
    },
  },
  server: {
    port: 3000,
    open: true
  }
};

