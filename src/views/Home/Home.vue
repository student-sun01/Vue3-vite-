<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img src="../../assets/images/user.png" alt="" />
          <div class="user-info">
            <p class="name">小孙一号</p>
            <p class="role">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间<span>2023-3-30</span></p>
          <p>上次登录地点<span>武汉</span></p>
        </div>
      </el-card>
      <!-- 卡片表格 -->
      <el-card shadow="hover" style="margin-top: 20px; height: 450px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :prop="key"
            :label="val"
            :key="key"
          />
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 20px">
      <div class="num">
        <el-card
          :body-style="{ display: 'flex', padding: 0 }"
          v-for="item in countData"
          :key="item.name"
        >
          <component
            class="icons"
            :is="item.icon"
            :style="{ background: item.color }"
          ></component>
          <div class="details">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px">
        <div ref="echart" style="height: 280px"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px">
          <div ref="userEchart" style="height: 240px"></div>
        </el-card>
        <el-card style="height: 260px">
          <div ref="videoEchart" style="height: 240px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
} from "vue";
import * as echarts from "echarts";
import axios from "axios";
export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance();
    let tableData = ref([]);
    let countData = ref([]);
    const tableLabel = {
      name: "手机型号",
      todayBuy: "今日购买",
      monthBuy: "本月购买",
      totalBuy: "总共购买",
    };
    const getTablist = async () => {
      // await axios
      // .get(
      // "https://www.fastmock.site/mock/951e822981570f5de2ba5b0c347d920a/api/home/getTableData"
      // )
      // .then((res) => {
      // console.log(res, "@@@");
      // if (res.data.code === 200) {
      // tableData.value = res.data.data;
      // }
      // });
      let res = await proxy.$api.getTableData();
      // console.log(res);
      tableData.value = res;
    };
    // 右侧六个图标数据
    const getCountData = async () => {
      let res = await proxy.$api.getCountData();
      // console.log(res);
      countData.value = res;
    };
    onMounted(() => {
      getTablist();
      getCountData();
      // 获取echarts表格数据
      getEchartData();
    });

    // 关于echarts表格的渲染部分
    let xOptions = reactive({
      // 图例文字颜色
      textStyle: {
        color: "#333",
      },

      grid: {
        left: "20%",
      },
      // 提示框
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category", // 类目轴
        data: [],
        axisLine: {
          lineStyle: {
            color: "#17b3a3",
          },
        },
        axisLabel: {
          interval: 0,
          color: "#333",
        },
      },
      yAxis: [
        {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
        },
      ],
      color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
      series: [],
    });
    let pieOptions = reactive({
      tooltip: {
        trigger: "item",
      },
      color: [
        "#0f78f4",
        "#dd536b",
        "#9462e5",
        "#a6a6a6",
        "#e1bb22",
        "#39c362",
        "#3ed1cf",
      ],
      series: [],
    });
    let orderData = reactive({
      xData: [],
      series: [],
    });
    let userData = reactive({
      xData: [],
      series: [],
    });
    let videoData = reactive({
      series: [],
    });
    // 获取数据
    const getEchartData = async () => {
      let result = await proxy.$api.getEchartData();
      // console.log(result);
      let res = result.orderData;
      let userRes = result.userData;
      let videoRes = result.videoData;
      orderData.xData = res.date;
      const keyArray = Object.keys(res.data[0]);
      const series = [];
      keyArray.forEach((key) => {
        series.push({
          name: key,
          data: res.data.map((item) => item[key]),
          type: "line",
        });
      });
      orderData.series = series;
      // console.log(orderData.xData);
      xOptions.xAxis.data = orderData.xData;
      xOptions.series = orderData.series;
      // 进行渲染
      let hEcharts = echarts.init(proxy.$refs["echart"]);
      hEcharts.setOption(xOptions);

      // 柱状图进行渲染的过程
      userData.xData = userRes.map((item) => item.date);
      userData.series = [
        {
          name: "新增用户",
          data: userRes.map((item) => item.new),
          type: "bar",
        },
        {
          name: "活跃用户",
          data: userRes.map((item) => item.active),
          type: "bar",
        },
      ];
      xOptions.xAxis.data = userData.xData;
      xOptions.series = userData.series;
      let uEcharts = echarts.init(proxy.$refs["userEchart"]);
      uEcharts.setOption(xOptions);

      // 饼状图
      videoData.series = [{
        data: videoRes,
        type: "pie",
      }]
      pieOptions.series = videoData.series;
      let vEcharts = echarts.init(proxy.$refs["videoEchart"]);
      vEcharts.setOption(pieOptions);
    };
    return {
      tableData,
      tableLabel,
      countData,
    };
  },
});
</script>

<style lang="less" scoped>
.home {
  .user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 20px;
    }
    .user-info {
      .name {
        font-size: 30px;
        font-weight: 700;
        margin-bottom: 30px;
      }
      .role {
        font-size: 20px;
        font-weight: 700;
        margin-left: 8px;
      }
    }
  }
  .login-info {
    p {
      line-height: 30px;
      color: #999;
      font-size: 14px;

      span {
        margin-left: 60px;
        color: #666;
      }
    }
  }
  .num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card {
      width: 32%;
      margin-bottom: 20px;
      .icons {
        width: 80px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        font-size: 30px;
        color: #fff;
      }
      .details {
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .num {
          font-size: 30px;
          margin-bottom: 10px;
        }
        .txt {
          font-size: 14px;
          text-align: center;
          color: #999;
          margin-left: 10px;
        }
      }
    }
  }
  .graph{
    display: flex;
    justify-content: space-between;
    .el-card{
      margin-top: 20px;
      width: 48%;
    }
  }
}
</style>
