// vite.config.ts
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from 'vite-svg-loader';

console.log("Using ", process.env.VITE_LAUNCH_EDITOR || code, "as the editor for vue devtools");

// https://vite.dev/config/
export default defineConfig({
    optimizeDeps: {
        entries: [
            './index.html',
        ],
    },
    plugins: [
        vue(),
        svgLoader(),
        vueDevTools({
            componentInspector: true, // default
            launchEditor: process.env.VITE_LAUNCH_EDITOR || 'code', // Use .env file to override
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
    define: {
        'process.env': {},
    },
    server: {
        host: '0.0.0.0',
        port: 2270,
    },
});
