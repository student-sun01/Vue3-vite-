import { createApp } from "vue";
// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";
import router from "./router";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import store  from "./store";
import './api/mock.js'
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
import App from "./App.vue";
import './less/index.less'

app.use(router).use(store)
// app.use(ElementPlus);
app.mount("#app");
