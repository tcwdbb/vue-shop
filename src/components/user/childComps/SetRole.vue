<template>
  <div class="set-role">
    <el-dialog
      title="分配角色"
      :visible="getRoleDialogVisible"
      width="50%"
      @close="clickSetRoleDialogVisible"
    >
      <div>
        <p>当前的用户：{{ getUserInfo.username }}</p>
        <p>当前的角色：{{ getUserInfo.role_name }}</p>
      </div>
      <el-select v-model="selectRoleId" placeholder="请选择">
        <el-option
          v-for="item in roleList"
          :key="item.id"
          :label="item.roleName"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clickSetRoleDialogVisible">取 消</el-button>
        <el-button type="primary" @click="setRole(getUserInfo.id)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { setUserRoole } from 'network/users.js'
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "SetRole",
  data() {
    return {
      selectRoleId: ''
    }
  },
  computed: {
    ...mapGetters(["getRoleDialogVisible", "getUserInfo", "roleList"]),
  },
  methods: {
    ...mapMutations(["setUserRoleDialogVisible"]),
    //点击取消隐藏分配角色对话框
    clickSetRoleDialogVisible() {
      this.selectRoleId = '';
      this.setUserRoleDialogVisible(false);
    },
    //点击关闭隐藏分配角色对话框
    // closeSetRoleDialogVisible() {
    //   this.setUserRoleDialogVisible(false);
    // }
    //点击确定分配角色
    setRole(id) {
      this.setUserRoole(id);
    },
    //给用户分配角色
    async setUserRoole(id) {
      const res = await setUserRoole(id, this.selectRoleId);
      if(res.meta.status !== 200) {
        return this.$message.error('分配角色失败');
      }
      this.$message.success('分配角色成功')
      this.setUserRoleDialogVisible(false);
    }
  },
};
</script>

<style>
</style>