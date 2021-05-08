<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="~assets/logo.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="exit">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isShow ? '64px' : '200px'">
        <home-aside
          :menusList="menusList"
          @toggleCollapse="toggleCollapse"
        ></home-aside>
      </el-aside>
      <!-- 主体区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HomeAside from "./childComps/HomeAside.vue";
import { getMenus } from "network/home.js";
import { mapMutations } from "vuex";
export default {
  components: { HomeAside },
  name: "Home",
  data() {
    return {
      menusList: [],
      isShow: false,
    };
  },
  //获取所有菜单
  async created() {
    const res = await getMenus();
    this.menusList = res.data;
    console.log(this.menusList);
  },
  methods: {
    ...mapMutations(["setBreadcrumb"]),
    //点击退出登录
    exit() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    //改变左侧菜单宽度
    toggleCollapse(isShow) {
      this.isShow = isShow;
    },
    //页面刷新将breadcrumbList保存到sessionStorage
    saveState() {
      window.sessionStorage.setItem(
        "breadcrumbList",
        this.$store.state.breadcrumbList.join(",")
      );
    },
  },
  mounted() {
    //监听页面刷新
    window.addEventListener("unload", this.saveState);
    //挂载完毕之后将sessionStorage中保存的breadcrumbList取出赋值给state
    this.$nextTick(() => {
      if (window.sessionStorage.getItem("breadcrumbList")) {
        const breadcrumbList = window.sessionStorage
          .getItem("breadcrumbList")
          .split(",");
        this.setBreadcrumb(breadcrumbList);
      }
    });
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0;
  font-size: 20px;
  color: #fff;
  background-color: #373d41;

  img {
    width: 50px;
    vertical-align: middle;
  }
  span {
    margin-left: 15px;
  }
}

.el-aside {
  background-color: #333744;
}

.el-main {
  background-color: #eaedf1;
}
</style>