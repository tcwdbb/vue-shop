<template>
  <el-dialog title="修改角色信息"
    :visible.sync="isShow"
    width="50%" @close="editClose">
    <el-form
      ref="editRoleInfo"
      :model="roleInfo"
      label-width="80px"
      :rules="roleFormRules"
    >
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="roleInfo.roleName"></el-input>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="roleInfo.roleDesc"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="clickDialogVisible">取 消</el-button>
      <el-button type="primary" @click="editRole">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import { editRoleInfo } from 'network/role.js'

export default {
  name: 'EditRoleInfo',
  props: {
    roleInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      isShow: false,
      roleFormRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
        ]
      }
    }
  },
  computed: {
    ...mapState({
      editRoleIsShow: 'editRoleIsShow'
    })
  },
  watch: {
    //监听editRoleIsShow的改变
    editRoleIsShow(val) {
      this.isShow = val
    }
  },
  methods: {
    ...mapActions(['getRoleList']),
    ...mapMutations(['setEditRoleIsShow']),
    //点击取消按钮隐藏对话框
    clickDialogVisible() {
      this.setEditRoleIsShow(false);
    },
    //点击确定按钮修改角色信息
    editRole() {
      this.editRoleInfo();
    },
    //监听关闭对话框
    editClose() {
      this.setEditRoleIsShow(false);
      this.$refs.editRoleInfo.resetFields();
    },
    //修改角色信息
    async editRoleInfo() {
      const res = await editRoleInfo(this.roleInfo);
      if(res.meta.status !== 200) {
        return this.$message.error('修改角色失败')
      }
      this.$message.success('修改成功');
      this.getRoleList();
      this.setEditRoleIsShow(false);
    }
  }
  
}
</script>

<style>

</style>