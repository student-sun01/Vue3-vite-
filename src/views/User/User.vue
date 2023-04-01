<template>
  <div class="user-header">
    <el-button type="primary" @click="handleAdd">+新增</el-button>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="请输入">
        <el-input v-model="formInline.keyword" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table :data="list" style="width: 100%; height: 500px">
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :width="item.width ? item.width : 125"
      />
      <el-table-column fixed="right" label="操作" min-width="180">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button type="danger" size="small" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="config.total"
      @current-change="changePage"
      class="pager mt-4"
    />
  </div>
  <el-dialog
    v-model="dialogVisible"
    :title="action == 'add' ? '新增用户' : '编辑用户'"
    width="38%"
    :before-close="handleClose"
  >
    <el-form :inline="true" :model="formUser" ref="userForm">
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="姓名"
            prop="name"
            :rules="[
              {
                required: true,
                message: '姓名是必填项',
                trigger: 'blur',
              },
            ]"
          >
            <el-input v-model="formUser.name" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="年龄"
            prop="age"
            :rules="[
              {
                required: true,
                message: '年龄是必填项',
                trigger: 'blur',
              },
              {
                type: 'number',
                message: '年龄必须是数字的格式',
                trigger: 'blur',
              },
            ]"
          >
            <el-input v-model.number="formUser.age" placeholder="请输入年龄" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="性别"
            prop="sex"
            :rules="[
              {
                required: true,
                message: '姓名是必选项',
              },
            ]"
          >
            <el-select v-model="formUser.sex" placeholder="请选择性别">
              <el-option label="男" value="1" />
              <el-option label="女" value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="出生日期"
            prop="birth"
            :rules="[
              {
                required: true,
                message: '出生日期是必选项',
              },
            ]"
          >
            <el-date-picker
              value-format="YYYY-MM-DD"
              v-model="formUser.birth"
              type="date"
              label="出生日期"
              placeholder="请选择"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item
          label="地址"
          prop="addr"
          :rules="[
            {
              required: true,
              message: '地址是必填项',
            },
          ]"
        >
          <el-input v-model="formUser.addr" placeholder="请输入地址" />
        </el-form-item>
      </el-row>
      <el-row class="button">
        <el-form-item>
          <el-button type="primary" @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit"> 确定 </el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
} from "vue";
import { editUser } from "../../../../my-app/src/api";
export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance();
    const list = ref([]);
    const tableLabel = reactive([
      {
        prop: "name",
        label: "姓名",
      },
      {
        prop: "age",
        label: "年龄",
      },
      {
        prop: "sexLabel",
        label: "性别",
      },
      {
        prop: "birth",
        label: "出生日期",
        width: 200,
      },
      {
        prop: "addr",
        label: "地址",
        width: 320,
      },
    ]);
    const config = reactive({
      total: 0,
      page: 1,
      name: "",
    });
    onMounted(() => {
      getUserData(config);
    });
    const getUserData = async (config) => {
      let res = await proxy.$api.getUserData(config);
      // console.log(res);
      list.value = res.list.map((item) => {
        item.sexLabel = item.sex === 0 ? "女" : "男";
        return item;
      });
      config.total = res.count;
    };
    const changePage = (page) => {
      // console.log(page);
      config.page = page;
      getUserData(config);
    };
    const formInline = reactive({
      keyword: "",
    });
    const handleSearch = () => {
      config.name = formInline.keyword;
      getUserData(config);
    };
    // dialogVisible控制模态框的显示与隐藏
    const dialogVisible = ref(false);
    const handleClose = (done) => {
      ElMessageBox.confirm("确认关闭吗")
        .then(() => {
          proxy.$refs.userForm.resetFields();
          done();
        })
        .catch(() => {
          // catch error
        });
    };
    // 添加新增用户form数据
    const formUser = reactive({
      name: "",
      age: "",
      sex: "",
      birth: "",
      addr: "",
    });
    // 新增用户
    const onSubmit = () => {
      // 表单校验
      proxy.$refs.userForm.validate(async (vaild) => {
        if (vaild) {
          if (action.value == "add") {
            let res = await proxy.$api.addUser(formUser);
            // console.log(res);
            if (res) {
              dialogVisible.value = false;
              proxy.$refs.userForm.resetFields();
              // console.log(formUser,'@@@');
              getUserData(config);
            }
          } else {
            // 编辑的接口
            //  console.log(formUser,'@@@');
            formUser.sex == "男" ? formUser.sex == 1 : formUser.sex == 0;
            let res = await proxy.$api.editUser(formUser);
            console.log(res, "####");
            if (res) {
              dialogVisible.value = false;
              proxy.$refs.userForm.resetFields();
              getUserData(config);
            }
          }
        } else {
          ElMessage({
            showClose: true,
            message: "请输入正确的信息",
            type: "error",
          });
        }
      });
    };
    // 取消
    const handleCancel = () => {
      dialogVisible.value = false;
      proxy.$refs.userForm.resetFields();
    };
    // 编辑用户
    // 区分编辑和新增
    const action = ref("add");
    const handleEdit = (row) => {
      // console.log(row);
      row.sex == "1" ? (row.sex = "男") : (row.sex = "女");
      action.value = "edit";
      dialogVisible.value = true;
      proxy.$nextTick(() => {
        // 浅拷贝
        Object.assign(formUser, row);
      });
    };
    // 新增用户
    const handleAdd = () => {
      action.value = "add";
      dialogVisible.value = true;
    };
    // 删除用户
    const handleDelete = (row) => {
       console.log(row);
      ElMessageBox.confirm("您确认删除吗")
        .then(async () => {
          await proxy.$api.DeleteUser({
            id: row.id,
          });
          ElMessage({
            showClose:true,
            type:"success",
            message:"删除成功"
          })
          getUserData(config);
        })
        .catch(() => {
          // catch error
        });
    };
    return {
      list,
      tableLabel,
      config,
      changePage,
      formInline,
      handleSearch,
      dialogVisible,
      handleClose,
      formUser,
      onSubmit,
      handleCancel,
      action,
      handleEdit,
      handleAdd,
      handleDelete,
    };
  },
});
</script>

<style lang="less" scoped>
.user-header {
  display: flex;
  justify-content: space-between;
}
.table {
  position: relative;
  height: 520px;
  .pager {
    position: absolute;
    right: 0;
    bottom: -20px;
  }
}
.button {
  margin-left: 420px;
}
</style>
