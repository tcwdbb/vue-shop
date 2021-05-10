<template>
  <div class="categories">
    <!-- 面包屑导航 -->
    <breadcrumb></breadcrumb>
    <!-- 卡片视图区域 -->
    <card-box>
      <categories-list @showDiglog="showDiglog"></categories-list>
      <pagination :total="getTotal" :querInfo="getCategoryListQuerInfo" @changeSize="changeSize" @changePage="changePage"></pagination>
    </card-box>
    <diglog-box title="添加分类" :dialogVisible="dialogVisible" @hideDialog="hideDialog" @clickSure="addCategoryDia">
      <add-category :categoryList="categoryList"></add-category>
    </diglog-box>
  </div>
</template>

<script>
import Breadcrumb from '../../breadcrumb/Breadcrumb.vue'
import CardBox from '../../card/CardBox.vue'
import CategoriesList from './CategoriesList.vue'
import Pagination from './Pagination.vue'
import AddCategory from './AddCategory.vue'

import { getGoodsCategoryList, addCategory } from 'network/goods/categories.js'

import { mapGetters, mapActions, mapMutations } from 'vuex'
import DiglogBox from '../../common/DiglogBox.vue'

export default {
  components: { Breadcrumb, CardBox, CategoriesList, Pagination, DiglogBox, AddCategory },
  name: 'Categories',
  data() {
    return {
      dialogVisible: false,
      //添加分类中父级分类数据
      categoryList: []
    }
  },
  computed: {
    ...mapGetters(['getCategoryListQuerInfo', 'getTotal', 'getAddCateForm'])
  },
  methods: {
    ...mapMutations(['setQuerInfo']),
    ...mapActions(['getCategoriesList']),
    //监听子组件发送的事件根据改变的size重新请求数据
    changeSize(newSize) {
      this.getCategoryListQuerInfo.pagesize = newSize;
      this.setQuerInfo(this.getCategoryListQuerInfo);
      this.getCategoriesList();
    },
    //监听子组件发送的事件根据改变的page重新请求数据
    changePage(newPage) {
      this.getCategoryListQuerInfo.pagenum = newPage;
      this.setQuerInfo(this.getCategoryListQuerInfo);
      this.getCategoriesList();
    },
    //监听子组件发送的事件显示添加分类对话框
    showDiglog(flag) {
      this.getGoodsCategoryList();
      this.dialogVisible = flag;
    },
    hideDialog(flag) {
      this.dialogVisible = flag;
    },
    //对话框点击确定添加分类并隐藏对话框
    addCategoryDia(flag) {
      this.addCategory();
      this.dialogVisible = flag;
      //重新请求最新的数据
      this.getCategoriesList();
    },
    //获取父级数据列表
    async getGoodsCategoryList() {
      const res = await getGoodsCategoryList({type: 2});
      if(res.meta.status !== 200) {
        return this.$message.error('获取父级分类列表失败')
      }
      this.categoryList = res.data;
    },
    //添加分类
    async addCategory() {
      console.log(this.getAddCateForm);
      const res = await addCategory(this.getAddCateForm);
      if(res.meta.status !== 201) {
        console.log(res.meta.msg);
        return this.$message.error('添加分类失败')
      }
      this.$message.success('添加分类成功')
    }
  }

}
</script>

<style>

</style>