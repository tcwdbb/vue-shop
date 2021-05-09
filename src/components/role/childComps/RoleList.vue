<template>
  <div class="role-list">
    <el-table :data="roleList" :border="true" :stripe="true">
      <!-- 展开列 -->
      <el-table-column type="expand">
        <template v-slot="scope">
          <!-- 一级权限 -->
          <el-row
            :class="['bdbottom', index === 0 ? 'bdtop' : '', 'vcenter']"
            v-for="(item, index) in scope.row.children"
            :key="index"
          >
            <el-col :span="5">
              <el-tag closable @close="removeRightById(scope.row, item.id)">{{ item.authName }}</el-tag>
              <i class="el-icon-caret-right"></i>
            </el-col>
            <!-- 二级权限 -->
            <el-col :span="19">
              <el-row
                class="vcenter"
                :class="{ bdtop: index1 !== 0 }"
                v-for="(item1, index1) in item.children"
                :key="index1"
              >
                <el-col :span="6">
                  <el-tag type="success" closable @close="removeRightById(scope.row, item1.id)">{{ item1.authName }}</el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <el-col :span="18">
                  <el-tag
                    closable
                    v-for="(item2, index2) in item1.children"
                    :key="index2"
                    type="warning"
                    @close="removeRightById(scope.row, item2.id)"
                    >{{ item2.authName }}</el-tag
                  >
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="editRoleInfo(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="removeRole(scope.row.id)"
            >删除</el-button
          >
          <el-button size="mini" type="warning" icon="el-icon-setting"
            @click="showSetRightVisible(scope.row)">分配权限</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <edit-role-info :roleInfo="roleInfo"></edit-role-info>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import { getRoleInfoById, removeRole,removeRightById } from "network/role.js";
import { getRightsList } from 'network/rights.js'
import EditRoleInfo from "./EditRoleInfo.vue";
export default {
  components: { EditRoleInfo },
  name: "RoleList",
  props: {
    roleList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      roleInfo: {},
    };
  },
  methods: {
    ...mapMutations(["setEditRoleIsShow", "setRightVisible", "setRightList", "setRightIdArr", 'setRoleId']),
    ...mapActions(["getRoleList"]),
    async editRoleInfo(id) {
      const res = await getRoleInfoById(id);
      if (res.meta.status != 200) {
        return this.$message.error("查询角色信息失败");
      }
      this.roleInfo = res.data;
      this.setEditRoleIsShow(true);
    },
    //根据id删除角色
    async removeRole(id) {
      const res = await removeRole(id);
      if (res.meta.status != 200) {
        return this.$message.error("删除失败");
      }
      this.$message.success("删除成功");
      this.getRoleList();
    },
    //根据id删除对应的权限
    async removeRightById(role, rightId) {
      //弹框提示是否要删除
      const confirmResult = await this.$confirm(
        "此操作将永久删除该文件, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if(confirmResult !== 'confirm') {
        return this.$message.info('取消了删除');
      }
      const res = await removeRightById(role.id, rightId);
      if(res.meta.status !== 200){
        return this.$message.error('删除权限失败')
      }
      this.$message.success('删除权限成功');
      role.children = res.data;
    },
    //点击显示权限分配对话框
    async showSetRightVisible(role) {
      //获取权限列表数据
      console.log(role);
      const res = await getRightsList('tree');
      if(res.meta.status !== 200) {
        return this.$message.error('权限列表获取失败');
      }
      //将权限列表保存到vuex中
      this.setRightList(res.data)
      //将角色id保存到vuex中
      this.setRoleId(role.id);
      let arr = [];
      //通过递归获取三级权限id
      this.getLeafKeys(role, arr);
      //将数组保存到vuex中
      this.setRightIdArr(arr)
      this.setRightVisible(true);
    },
    //通过递归的形式获取角色下所有三级权限的id，并保存到rightIdArr数组中
    getLeafKeys(node, arr) {
      //如果当前节点没有children节点则是三级节点
      if(!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item => this.getLeafKeys(item, arr));
    }
  },
};
</script>

<style lang="less" scoped>
.el-tag {
  margin: 7px;
}

.bdtop {
  border-top: 1px solid #eee;
}

.bdbottom {
  border-bottom: 1px solid #eee;
}

.vcenter {
  display: flex;
  align-items: center;
}
</style>