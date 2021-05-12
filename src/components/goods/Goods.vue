<template>
  <div class="goods">
    <breadcrumb></breadcrumb>
    <card-box>
      <!-- 搜索区域 -->
      <goods-search></goods-search>
      <!-- 列表区域 -->
      <goods-list></goods-list>
      <!-- 分页区域 -->
      <pagination
        :querInfo="getGoodsQueryInfo"
        :total="getterGoodsTotal"
        @changeSize="changeSize"
        @changePage="changePage"
      ></pagination>
    </card-box>
  </div>
</template>

<script>
import Breadcrumb from "../breadcrumb/Breadcrumb.vue";
import CardBox from "../card/CardBox";
import Pagination from "./categories/Pagination.vue";
import GoodsList from "./GoodsList.vue";
import GoodsSearch from "./GoodsSearch";

import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  components: { Breadcrumb, CardBox, GoodsSearch, GoodsList, Pagination },
  name: "Goods",
  data() {
    return {
      queryInfo: {},
    };
  },
  created() {
    this.queryInfo = {
      query: this.getGoodsQueryInfo.query,
      pagenum: this.getGoodsQueryInfo.pagenum,
      pagesize: this.getGoodsQueryInfo.pagesize,
    };
  },
  computed: {
    ...mapGetters(["getGoodsQueryInfo", "getterGoodsTotal"]),
  },
  methods: {
    ...mapMutations(["setGoodsQueryInfo"]),
    ...mapActions(["getGoodsList"]),
    //监听分页组件发出的事件，重新请求新的数据
    changeSize(newSize) {
      this.queryInfo.pagesize = newSize;
      this.setGoodsQueryInfo(this.queryInfo);
      this.getGoodsList();
    },
    //监听分页组件发出的事件，重新请求新的数据
    changePage(newPage) {
      this.queryInfo.pagenum = newPage;
      this.setGoodsQueryInfo(this.queryInfo);
      this.getGoodsList();
    }
  },
};
</script>

<style lang="less" scoped>
</style>