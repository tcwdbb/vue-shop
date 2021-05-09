<template>
  <el-dialog title="添加角色" :visible="roleIsShow" width="50%" @close="addDialogClose">
      <el-form
        :model="addRoleForm"
        :rules="roleFormRules"
        ref="addFormRef"
        label-width="100px"
      >
        <el-form-item label="角色名" prop="roleName">
          <el-input v-model="addRoleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addRoleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clickDialogVisible">取 消</el-button>
        <el-button type="primary" @click="addRole"
          >确 定</el-button
        >
      </span>
    </el-dialog>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { addRole } from 'network/role.js'
export default {
  name: 'AddRole',
  data() {
    return {
      addRoleForm: {
        roleName: '',
        roleDesc: ''
      },
      roleFormRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
        ],
        roleDesc: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['roleIsShow'])
  },
  methods: {
    ...mapMutations(['setAddRoleIsShow']),
    ...mapActions(['getRoleList']),
    //点击关闭隐藏添加角色对话框
    addDialogClose() {
      this.setAddRoleIsShow(false);
      this.$refs.addFormRef.resetFields();
    },
    //点击取消隐藏添加角色对话框
    clickDialogVisible() {
      this.setAddRoleIsShow(false);
    },
    async addRole() {
      const res = await addRole(this.addRoleForm);
      if(res.meta.status !== 201) {
        console.log(res.meta.msg);
        return this.$message.error('角色添加失败');
      }
      this.$message.success('角色添加成功');
      this.getRoleList();
      this.setAddRoleIsShow(false);
    }
  }
}
</script>

<style>

</style>