<template>
  <div class="tags">
    <el-tag
      v-for="(tag, index) in tags"
      :key="tag.name"
      :closable="tag.name !== 'home'"
      :disable-transitions="false"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @click="chageMenu(tag)"
      @close="handleClose(tag, index)"
      >{{ tag.label }}</el-tag
    >
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const route = useRoute();
    const tags = store.state.tabsList;
    const chageMenu = (item) => {
      router.push({
        name: item.name,
      });
    };
    // 删除tag
    const handleClose = (tag, index) => {
      let length = tags.length - 1;
      // 处理vuex中的tabsList
      store.commit("colseTab", tag);
      if (tag.name !== route.name) {
        return;
      }
      if (index === length) {
        router.push({
          name: tags[index - 1].name,
        });
      }else{
        router.push({
            name:tags[index].name
        })
      }
    };
    return {
      tags,
      chageMenu,
      handleClose,
    };
  },
};
</script>

<style lang="less" scoped>
.tags {
  width: 100%;
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
