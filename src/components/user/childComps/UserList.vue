<template>
 <div class="user-list">
    <el-table
        class="table-box"
        :data="userList1"
        :border="true"
        :stripe="true"
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态" prop="mg_state">
          <template v-slot="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column :fit="true" label="操作">
          <template v-slot="scope">
            <!-- 修改按钮 -->
            <el-tooltip :enterable="false" content="修改" placement="top">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
                @click="updateUser(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip :enterable="false" content="删除" placement="top">
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="removeUserById(scope.row.id)"
                
              ></el-button>
            </el-tooltip>
            <!-- 分配角色按钮 -->
            <el-tooltip :enterable="false" content="分配角色" placement="top">
              <el-button
                type="warning"
                size="mini"
                icon="el-icon-setting"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <update-user-form :userId="userId" :dialogVisible="dialogVisible" @updateIsShow="updateIsShow"></update-user-form>
 </div>
</template>

<script>
import { setUserState } from "network/home.js";
import UpdateUserForm from './UpdateUserForm.vue';
import { removeUserById } from 'network/users.js';
import { getUserListMixin } from '../../../common/mixin'

export default {
  components: { UpdateUserForm },
  name: 'UserList',
  mixins: [getUserListMixin],
  props: {
    userList1: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data () {
    return {
      userId: null,
      dialogVisible: false
    }
  },
  methods: {
    //监听switch状态改变
    async userStateChange(userInfo) {
      const res = await setUserState(userInfo);
      if (res.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state;
        return this.$message.error("更新用户状态失败！");
      }
      this.$message.success("更新用户状态成功！");
    },
    //修改用户信息
    updateUser(userId) {
      console.log(userId);
      this.userId = userId;
      this.dialogVisible = true;
    },
    updateIsShow(val) {
      this.dialogVisible = val;
    },
    //点击删除根据id删除指定用户
    removeUserById(id) {
        //弹框提示
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async () => {
          //发送删除请求
          const res = await removeUserById(id);
          if(res.meta.status !== 200) return this.$message.error('删除失败');
          this.getUserList();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
  }
}
</script>

<style scoped>

</style>