<template>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) of getBreadcrumb" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "Breadcrumb",
  computed: {
    ...mapGetters(['getBreadcrumb'])
  },
};
</script>

<style lang='less' scoped>
</style>