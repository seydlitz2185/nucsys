import { createApp, VueElement } from 'vue'
import naive from "naive-ui";
import App from "./App.vue";
import 'amfe-flexible';
import 'amfe-flexible/index.js';
import router  from './router/index.js';
import VueCookies from 'vue-cookies'

const app = createApp(App);
app.use(naive);
app.use(router);
app.config.globalProperties.$cookies = VueCookies;
app.mount("#app");

