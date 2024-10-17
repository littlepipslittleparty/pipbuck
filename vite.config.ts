// vite.config.ts
/* eslint-disable import/no-extraneous-dependencies */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import svgLoader from 'vite-svg-loader';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
      vue(),
      svgLoader(),
      vueDevTools({
        componentInspector: true, // default
        launchEditor: 'pycharm',
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
