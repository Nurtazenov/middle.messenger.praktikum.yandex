import handlebars from 'vite-plugin-handlebars';
import path from 'path';
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
  // plugins: [
  //   handlebars({
  //     partialDirectory : path.resolve('__dirname', 'src/partials'),
  //     context: {
  //       title: 'Hello Yandex Practicum!',
  //     },
  //   }),
  // ],
  server: {
    port: 3000
  }
};





