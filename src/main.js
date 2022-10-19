import { createApp, VueElement } from 'vue'
import naive from "naive-ui";
import App from "./App.vue";
import 'amfe-flexible';
import 'amfe-flexible/index.js';
import router  from './router/index.js';
import VueCookies from 'vue-cookies';
import { createPinia } from 'pinia';
import piniaPluginPersist from 'pinia-plugin-persist';
const app = createApp(App);
app.use(naive);
app.use(router);
const pinia = createPinia();
pinia.use(piniaPluginPersist);
app.use(pinia);
app.config.globalProperties.$cookies = VueCookies;
app.mount("#app");

