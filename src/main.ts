import {createApp} from 'vue';
import { createHead } from '@unhead/vue'
import VueGtag from 'vue-gtag';
import screenfull from 'screenfull';
import './lib/audiocontect-patch';
import App from './App.vue';
import router from './router';
import store from './state';
import {createPinia} from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const head = createHead()

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)

const app = createApp(App);
app.use(pinia)
    .use(router)
    .use(store)
    .use(head)
    .use(VueGtag, {
        config: {
            id: process.env.NODE_ENV !== 'production' ? 'UA-47744366-5' : 'UA-47744366-4',
            params: {
                send_page_view: true,
            },
        },
        appName: 'Pipbuck v3',
        pageTrackerScreenviewEnabled: true,
    }, router);
app.mount('#app');

if (process.env.NODE_ENV !== 'production') {
    globalThis.$vm = app;
}

if (screenfull.isEnabled) {
    // Seems to be broken after migration to vue 3
    // screenfull.request();
}
