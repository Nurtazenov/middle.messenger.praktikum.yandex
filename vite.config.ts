import handlebars from 'vite-plugin-handlebars';
import {defineConfig} from 'vite'
import path from 'path'
export default defineConfig({

  optimizeDeps: {
    include: ['handlebars'] // добавить зависимость handlebars
  },

  build:{
    outDir:path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    
  },
  
  plugins: [
    handlebars({
      partialDirectory: path.resolve(__dirname, 'src/partials'),

      context: {
        title: 'Hello Yandex Practicum!',
      },
    }),
  ],
});
