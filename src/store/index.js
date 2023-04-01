import { createStore } from "vuex";

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
    colseTab(state,val){
      let res = state.tabsList.findIndex(item=>item.name === val.name)
      state.tabsList.splice(res,1)
    }
  },
});
