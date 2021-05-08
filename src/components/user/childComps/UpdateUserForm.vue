<template>
  <el-dialog
    title="修改用户信息"
    :visible.sync="isShow"
    width="50%"
    @close="updateDialogClose"
  >
    <el-form
      ref="updateUserForm"
      :model="userInfo"
      label-width="80px"
      :rules="userFormRules"
    >
      <el-form-item label="用户名">
        <el-input v-model="userInfo.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userInfo.email"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="mobile">
        <el-input v-model="userInfo.mobile"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="clickDialogVisible">取 消</el-button>
      <el-button type="primary" @click="updateUserInfo">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getUserListMixin, proofRulesMixin } from "../../../common/mixin";
import { getUserById, updateUserInfo } from "network/users.js";
export default {
  name: "UpdateUserForm",
  mixins: [getUserListMixin, proofRulesMixin],
  props: {
    userId: {
      type: Number,
      default() {
        return 0;
      },
    },
    dialogVisible: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      //修改用户信息对话框显示与否
      isShow: this.dialogVisible,
      userInfo: {},
    };
  },
  methods: {
    //点击隐藏修改用户对话框
    clickDialogVisible() {
      this.isShow = false;
    },
    //点击按钮修改用户信息
    updateUserInfo() {
      this.$refs.updateUserForm.validate(async (valid) => {
        if (!valid) return;
        const res = await updateUserInfo(this.userInfo);
        if (res.meta.status != 200) {
          return this.$message.error("修改用户信息失败");
        }
        this.$message.success("修改用户信息成功");
        this.isShow = false;
        console.log(this.queryInfo);
        this.getUserList();
      });
    },
    //根据id查询用户信息
    async getUserInfoById() {
      const res = await getUserById(this.userId);
      if (res.meta.status != 200) {
        return this.$message.error("查询用户信息失败");
      }
      this.userInfo = res.data;
    },
    updateDialogClose() {
      this.$refs.updateUserForm.resetFields();
    },
  },
  watch: {
    //监听dialogVisible的改变，判断修改用户对话框的显示与隐藏
    dialogVisible(val) {
      if (val === true) {
        //修改用户对话框为true时发送请求
        this.getUserInfoById();
      }
      this.isShow = val;
    },
    //监听isShow的改变，修改父组件内dialogVisible的值
    isShow(val) {
      this.$emit("updateIsShow", val);
    },
  },
};
</script>

<style>
</style>