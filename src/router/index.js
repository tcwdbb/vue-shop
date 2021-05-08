import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import ('components/login/Login.vue');
const Home = () => import ('views/home/Home.vue');
const Welcome = () => import ('views/home/childComps/Welcome.vue');
const Users = () => import ('components/user/Users.vue');
const Rights = () => import ('components/rights/Rights.vue');
const Orders = () => import ('components/order/Orders.vue');
const Goods = () => import ('components/goods/Goods.vue');
const Reports = () => import ('components/report/Reports.vue');
const Roles = () => import ('components/role/Roles.vue')
const Categories = () => import ('components/categories/Categories.vue')
const Params = () => import ('components/params/Params.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
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
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'Welcome',
        component: Welcome
      },
      {
        path: '/users',
        name: 'Users',
        component: Users
      },
      {
        path: '/rights',
        name: 'Rights',
        component: Rights
      },
      {
        path: '/orders',
        name: 'Orders',
        component: Orders
      },
      {
        path: '/goods',
        name: 'Goods',
        component: Goods
      },
      {
        path: '/reports',
        name: 'Reports',
        component: Reports
      },
      {
        path: '/roles',
        name: 'Roles',
        component: Roles
      },
      {
        path: '/categories',
        name: 'Categories',
        component: Categories
      },
      {
        path: '/params',
        name: 'Params',
        component: Params
      }
    ]
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
