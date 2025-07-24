import handlebars from 'vite-plugin-handlebars';
import path, {resolve} from 'path';
import vitePluginHandlebarsPrecompile from './vite-plugin-handlebars-precompile';
import eslintPlugin from "vite-plugin-eslint";
import svgr from "vite-plugin-svgr";
export default {
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['legacy-js-api'],
      }
      
    },
    
  },
  optimizeDeps: {
    include: ['handlebars'],

  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
  plugins: [
    handlebars({
    }),
  ],
  server: {
    port: 3000
  }
};

