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
    <el-col :span="16" style="margin-top: 20px"></el-col>
  </el-row>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import axios from "axios";
export default defineComponent({
  setup() {
    let tableData = ref([]);
    const tableLabel = {
      name: "手机型号",
      todayBuy: "今日购买",
      monthBuy: "本月购买",
      totalBuy: "总共购买",
    };
    const getTablist = async () => {
      await axios
        .get(
          "https://www.fastmock.site/mock/951e822981570f5de2ba5b0c347d920a/api/home/getTableList"
        )
        .then((res) => {
          // console.log(res, "@@@");
          if (res.data.code === 200) {
            tableData.value = res.data.data;
          }
        });
    };
    onMounted(() => {
      getTablist();
    });
    return {
      tableData,
      tableLabel,
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
}
</style>
