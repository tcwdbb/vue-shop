<template>
  <el-dialog title="添加用户" :visible.sync="isShow" width="50%" @close="addDialogClose">
      <el-form
        :model="addUserForm"
        :rules="userFormRules"
        ref="addFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clickDialogVisible">取 消</el-button>
        <el-button type="primary" @click="addUser"
          >确 定</el-button
        >
      </span>
    </el-dialog>
</template>

<script>
import {addUser} from 'network/users.js'
import { getUserListMixin, proofRulesMixin } from '../../../common/mixin'

export default {
  name: 'AddUserForm',
  mixins: [getUserListMixin, proofRulesMixin],
  props: {
    dialogVisible: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    
    return {
      isShow: this.dialogVisible,
      //添加用户的表单数据
      addUserForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
    }
  },
  methods: {
    //点击隐藏添加用户对话框
    clickDialogVisible() {
      this.isShow = false;
    },
    //监听添加用户对话框的关闭事件
    addDialogClose() {
      this.$refs.addFormRef.resetFields();
    
    },
    //点击按钮添加新用户
    addUser() {
      this.$refs.addFormRef.validate(async valid => {
        if(!valid) return;
        const res = await addUser(this.addUserForm);
        console.log(res);
        if(res.meta.status !== 201) {
          return this.$message.error(res.meta.msg);
        }
        this.isShow = false;
        this.$message.success('添加用户成功！');
        this.getUserList();
      }) 
    }
  },
  watch: {
    //监听父组件传递过来的dialogVisible的改变判断显示与否
    dialogVisible(val) {
      this.isShow = val;
    },
    //监听当前页面的isShow的改变发送事件修改父组件的dialogVisible
    isShow(val) {
      this.$emit('updateIsShow', val);
    }
  },
  
}
</script>

<style scoped>

</style>