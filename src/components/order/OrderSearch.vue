<template>
  <div class="order-search">
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
            @click="searchOrderInfo"
          >
          </el-button>
        </el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  name: "OrderSearch",
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 5,
      },
    };
  },
  methods: {
    ...mapMutations(['setOrderQueryInfo']),
    ...mapActions(['getOrdersList']),
    //监听搜索框的清空，清空后重新请求全部数据
    inputClear() {
      this.setOrderQueryInfo(this.queryInfo);
      this.getOrdersList();
    },
    //监听搜索按钮的点击
    searchOrderInfo() {
      this.setOrderQueryInfo(this.queryInfo);
      this.getOrdersList();
    }
  },
};
</script>

<style lang="less" scoped>
.order-search {
  margin-top: 15px;
}
</style>