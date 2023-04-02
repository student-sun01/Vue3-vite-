/* 
整个项目api的管理
*/

import request from "./request";

export default {
  // home组件，左侧表格数据获取
  getTableData(params) {
    return request({
      url: "/home/getTableData",
      method: "get",
      data: params,
      mock: true,
    });
  },

  // 右侧六个图标数据
  getCountData() {
    return request({
      url: "/home/getCountData",
      method: "get",
      // data: params,
      mock: true,
    });
  },

  // 折线图 柱状图 饼图数据
  getEchartData() {
    return request({
      url: "/home/getEchartData",
      method: "get",
      mock: true,
    });
  },

  // 用户数据
  getUserData(params) {
    return request({
      url: "/user/getUser",
      method: "get",
      data: params,
      mock: false,
    });
  },

  // 新增用户
  addUser(params) {
    return request({
      url: "/user/add",
      method: "post",
      data: params,
      mock: false,
    });
  },

  // 编辑用户
  editUser(params) {
    return request({
      url: "/user/edit",
      method: "post",
      data: params,
      mock: false,
    });
  },

  // 删除用户
  DeleteUser(params) {
    return request({
      url: "/user/delete",
      method: "get",
      data: params,
      mock: false,
    });
  },

  // 根据用户的用户名不同，返回不同的菜单列表
  getMenu(params) {
    return request({
      url: "/permission/getMenu",
      method: "post",
      data: params,
      mock: false,
    });
  },
};
