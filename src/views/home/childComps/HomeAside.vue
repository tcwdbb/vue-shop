<template>
  <div class="aside" v-if="menusList.length != 0">
    <el-menu
      background-color="#333744"
      text-color="#fff"
      active-text-color="#409EFF"
      :unique-opened = "true"
      :collapse = "isShow"
      :collapse-transition="false"
      :router="true"
      :default-active="$route.path"
    >
    <div class="toggle-button" @click="toggleCollapse">|||</div>
      <!-- 一级菜单 -->
      <el-submenu :index="index + ''" v-for="(item, index) of menusList" :key="index">
        <!-- 一级菜单模版 -->
        <template slot="title">
          <!-- 图标 -->
          <i class="el-icon-location"></i>
          <!-- 文本 -->
          <span >{{item.authName}}</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item @click="setBreadcrumbClick(item.authName, subItem.authName)" :index="'/' + subItem.path" v-for="(subItem, subIndex) of item.children" :key="subIndex">
          <template slot="title">
          <!-- 图标 -->
          <i class="el-icon-menu"></i>
          <!-- 文本 -->
          <span >{{subItem.authName}}</span>
        </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: "HomeAside",
  props: {
    menusList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      //是否折叠
      isShow: false
    }
  },
  methods: {
    ...mapMutations(['setBreadcrumb']),
    //点击折叠侧边栏菜单
    toggleCollapse() {
      this.isShow = !this.isShow;
      this.$emit('toggleCollapse',this.isShow);
    },
    //点击修改面包屑导航内容
    setBreadcrumbClick(authName, subAuthName) {
      const authNameArr = [];
      authNameArr.push(authName,subAuthName);
      this.setBreadcrumb(authNameArr);
    }
  }
};
</script>

<style lang="less" scoped>
.aside {
  color: #fff;
  height: 100%;
}

.el-menu {
  border-right: 0;
}

.toggle-button {
  font-size: 10px;
  line-height: 24px;
  letter-spacing: .2em;
  text-align: center;
  background-color: #4A5064;
  cursor: pointer;
}
</style>