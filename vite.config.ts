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
};
