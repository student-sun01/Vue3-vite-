<template>
  <el-header>
    <div class="l-content">
      <!-- 图标的展示· -->
      <el-button size="small" @click="handleCollapse">
        <el-icon :size="20"><Menu /></el-icon>
      </el-button>
      <h3>首页</h3>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span>
          <img :src="getImgSrc('user')" class="user" alt="" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>
<script>
import { useStore } from "vuex";
export default {
  setup() {
    let store = useStore();
    const getImgSrc = (user) => {
      return new URL(`../assets/images/${user}.png`, import.meta.url).href;
    };
    let handleCollapse = () => {
      // 调用vuex中的mutations
      store.commit("updateIsCollapse", "123");
    };
    return {
      getImgSrc,
      handleCollapse
    };
  },
};
</script>

<style lang="less" scoped>
header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background:rgba(0, 0, 0, 0.762);
}
.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
  h3 {
    color: #fff;
  }
}
</style>
