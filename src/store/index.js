import { createStore } from "vuex";
import Cookie from "js-cookie";
export default createStore({
  state: {
    isCollapse: true,
    currentMenu: null,
    tabsList: [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "home",
      },
    ],
    menu: [],
    token: "",
  },
  mutations: {
    updateIsCollapse(state, payload) {
      state.isCollapse = !state.isCollapse;
      console.log(payload);
    },

    selectMenu(state, val) {
      // console.log(val);

      if (val.name === "home") {
        state.currentMenu = null;
      } else {
        state.currentMenu = val;
        let index = state.tabsList.findIndex((item) => {
          return item.name === val.name;
        });
        index == -1 ? state.tabsList.push(val) : "";
      }
    },
    colseTab(state, val) {
      let res = state.tabsList.findIndex((item) => item.name === val.name);
      state.tabsList.splice(res, 1);
    },
    setMenu(state, val) {
      state.menu = val;
      localStorage.setItem("menu", JSON.stringify(val));
    },
    addMenu(state, router) {
      if (!localStorage.getItem("menu")) {
        return;
      }
      const menu = JSON.parse(localStorage.getItem("menu"));
      state.menu = menu;

      const menuArray = [];
      menu.forEach((item) => {
        if (item.children) {
          item.children = item.children.map((item) => {
            let url = `../views/${item.url}.vue`;
            item.component = () => import(url);
            return item;
          });
          menuArray.push(...item.children);
        } else {
          let url = `../views/${item.url}.vue`;
          item.component = () => import(url);
          menuArray.push(item);
        }
      });
      menuArray.forEach((item) => {
        router.addRoute("home1", item);
      });
    },
    clearMenu(state) {
      state.menu = [];
      localStorage.removeItem("menu");
    },
    setToken(state, val) {
      state.token = val;
      Cookie.set("token", val);
    },
    clearToken() {
      state.token = "";
      Cookie.remove("token");
    },
    getToken(state) {
      state.token = state.token || Cookie.get("token");
    },
  },
});
