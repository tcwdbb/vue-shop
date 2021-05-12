<template>
  <div class="goods-search">
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
          @click="searchGoodsInfo"
          >
          </el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddPage"
          
            >添加商品</el-button
          >
        </el-col>
      </el-row>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  name: 'GoodsSearch',
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 5,
      },
    }
  },
  methods: {
    ...mapMutations(['setGoodsQueryInfo']),
    ...mapActions(['getGoodsList']),
    //监听输入框内容的清空
    inputClear() {
      this.setGoodsQueryInfo(this.queryInfo);
      this.getGoodsList();
    },
    //点击搜索按钮
    searchGoodsInfo() {
      this.setGoodsQueryInfo(this.queryInfo);
      this.getGoodsList();
    },
    //跳转到新增商品页面
    goAddPage() {
      this.$router.push({path:'/goods/add'})
    }
  }
}
</script>

<style>

</style>