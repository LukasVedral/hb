import { defineConfig } from 'vite';

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