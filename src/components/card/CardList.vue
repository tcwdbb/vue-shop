<template>
  <div class="card-list">
    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            clearable
            @clear="inputClear"
            v-model="queryInfo.query"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchUserInfo"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="dialogVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <user-list :userList1="userList"></user-list>
      <!-- 页码区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加用户区域 -->
    <add-user-form :dialogVisible="dialogVisible" @updateIsShow="updateIsShow"></add-user-form>
  </div>
</template>

<script>

import AddUserForm from '../user/childComps/AddUserForm.vue';
import UserList from '../user/childComps/UserList.vue';
import { getUserListMixin } from '../../common/mixin'
// import { debounce } from '../../common/utils'

export default {
  components: { AddUserForm, UserList },
  mixins: [ getUserListMixin ],
  name: "CardList",
  data() {
    return {
      //用户列表数据
      userList: [],
      total: 0,
      
      // getUserListDe: null
      dialogVisible: false,
      
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    
    //监听pagesize改变事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },
    //监听页码改变
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },
    
    //点击清空输入框重新请求全部数据
    inputClear() {
      this.queryInfo.pagenum = 1;
      this.getUserList();
    },
    //点击搜索按钮搜索指定数据
    searchUserInfo() {
      this.queryInfo.pagenum = 1;
      this.getUserList();
    },
    //通过子组件的值修改dialogVisible
    updateIsShow(val) {
      this.dialogVisible = val;
    }
  },
  mounted() {
    //输入框发生变化自动请求数据（防抖）
    //this.getUserListDe = debounce(this.getUserList, 800);
  },
};
</script>

<style lang="less" scoped>
.card-list {
  margin-top: 15px;
  .box-card {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
    .table-box {
      margin-top: 15px;
    }
  }
  .el-pagination {
    padding-top: 15px;
  }
}
</style>