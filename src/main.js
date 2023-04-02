import { createApp } from "vue";
// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";
import router from "./router";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import store from "./store";
import "./api/mock.js";
import api from "./api/api.js";
import "./less/index.less";
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
import App from "./App.vue";
app.config.globalProperties.$api = api;
store.commit("addMenu", router);
function checkRouter(path) {
  let hasCheck = router
    .getRoutes()
    .filter((route) => route.path == path).length;
  // console.log(hasCheck);
  if (hasCheck) {
    return true;
  } else {
    return false;
  }
}

// 全局导航前置守卫
router.beforeEach((to, from, next) => {
  store.commit("getToken");
  const token = store.state.token;
  if (!token && to.name !== "login") {
    next({ name: "login" });
  } else if (!checkRouter(to.path)) {
    next({ name: "home" });
  } else {
    next();
  }
});
app.use(router).use(store);

// app.use(ElementPlus);
app.mount("#app");
