import { createApp } from 'vue';
import { createMetaManager } from 'vue-meta';
import VueGtag from "vue-gtag";
import screenfull from 'screenfull';
import './lib/audiocontect-patch';
import App from './App.vue';
import router from './router';
import store from './state';

const app = createApp(App);
app.use(router).use(store);

const metaManager = createMetaManager();
app.use(metaManager);

app.use(VueGtag, {
  config: {
    id: process.env.NODE_ENV !== 'production' ? 'UA-47744366-5' : 'UA-47744366-4',
    params: {
      send_page_view: true,
    },
  },
  pageTrackerScreenviewEnabled: true,
}, router);
app.mount('#app');

if (process.env.NODE_ENV !== 'production') {
  globalThis.$vm = app;
}
if (screenfull.isEnabled) {
  screenfull.request();
}