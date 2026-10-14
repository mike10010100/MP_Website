import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(import.meta.dirname, 'index.html'),
                resume: resolve(import.meta.dirname, 'resume.html'),
                videos: resolve(import.meta.dirname, 'videos.html'),
                voiceover: resolve(import.meta.dirname, 'voiceover.html'),
                contact: resolve(import.meta.dirname, 'contact.html'),
                notFound: resolve(import.meta.dirname, '404.html')
            }
        }
    }
});
