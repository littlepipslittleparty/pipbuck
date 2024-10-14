// vite.config.js
import vue from '@vitejs/plugin-vue2'
import svgLoader from 'vite-svg-loader';
export default {
    plugins: [
        vue(),
        svgLoader(),
    ],
    server: {
        host: '0.0.0.0',
        port: 5173,
    },
}