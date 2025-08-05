import { defineConfig } from 'vite';
import copy from 'rollup-plugin-copy' 

export default defineConfig({
  publicDir: 'public',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'about.html',
        contact: 'contact.html',
        applications: 'applications.html',
        gallery: 'gallery.html',
        propositon: 'proposition.html',
        years: 'years.html',
      },
    },
  },
});