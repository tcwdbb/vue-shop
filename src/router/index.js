import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import ('components/login/Login.vue');
const Home = () => import ('../views/home/Home.vue');

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: 'login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})
//用户没有登录需要跳转到登录页面
router.beforeEach((to, from, next) => {
  if(to.path === '/login') return next()
  const token = window.sessionStorage.getItem('token');
  if(!token) {
    return next('/login');
  }
  next();
})

export default router
