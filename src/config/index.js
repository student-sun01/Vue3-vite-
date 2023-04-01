/* 
环境配置文件
一般企业级项目里面有三个环境
开发环境
测试环境
线上环境
*/

// 当前的环境
const env = import.meta.env.MODE || "prod";

const EnvConfig = {
  development: {
    baseApi: "/api",
    mockApi:
      "https://www.fastmock.site/mock/951e822981570f5de2ba5b0c347d920a/api"
  },
  test: {
    baseApi: "//test.future.com/api",
    mockApi:
      "https://www.fastmock.site/mock/951e822981570f5de2ba5b0c347d920a/api"
  },
  pro: {
    baseApi: "//future.com/api",
    mockApi:
      "https://www.fastmock.site/mock/951e822981570f5de2ba5b0c347d920a/api"
  },
};

export default {
    env,
    // mock的总开关
    mock:true,
    ...EnvConfig[env]

}
