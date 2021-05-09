<template>
  <el-dialog
    title="分配权限"
    :visible="setRightIsShow"
    width="30%"
    @close="setRightClose"
  >
    <!-- 树形控件 -->
    <el-tree
      :data="rightList"
      :props="treeProps"
      :show-checkbox="true"
      node-key="id"
      :default-expand-all="true"
      :default-checked-keys="rightIdArr"
      ref="treeRef"
    ></el-tree>
    <span slot="footer" class="dialog-footer">
      <el-button @click="showSetRightVisible">取 消</el-button>
      <el-button type="primary" @click="allotRight">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters, mapMutations, mapState, mapActions } from "vuex";
import { setRoleRights } from 'network/role.js'
export default {
  name: "SetRightDialog",
  data() {
    return {
      // rightList: []
      treeProps: {
        label: "authName",
        children: "children",
      },
    };
  },
  computed: {
    ...mapState({
      rightList: "rightList",
      rightIdArr: 'rightIdArr',
      roleId: 'roleId'
    }),
    ...mapGetters(["setRightIsShow"]),
  },
  methods: {
    ...mapMutations(["setRightVisible"]),
    ...mapActions(["getRoleList"]),
    //点击取消隐藏权限设置对话框
    showSetRightVisible() {
      this.setRightVisible(false);
    },
    //点击关闭隐藏权限设置对话框
    setRightClose() {
      this.setRightVisible(false);
    },
    //点击为角色分配权限
    allotRight() {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ];
      const idStr = keys.join(',');
      this.setRoleRights(this.roleId, idStr);
    },
    //发送请求更新角色权限
    async setRoleRights(roleId, idStr) {
      const res = await setRoleRights(roleId, idStr);
      if(res.meta.status !== 200) {
        return this.$message.error('权限分配失败');
      }
      this.$message.success('权限分配成功');
      this.setRightVisible(false);
      this.getRoleList();
    }
  },
};
</script>

<style>
</style>