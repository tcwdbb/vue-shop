import Vuex from 'vuex'
import Vue from 'vue'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

const state = {
  //面包屑导航数据
  breadcrumbList: [],
  //角色id
  roleId: 0,
  //角色修改对话框的显示与否
  editRoleIsShow: false,
  //角色列表信息
  roleList: [],
  //角色添加对话框的显示与否
  addRoleIsShow: false,
  //分配权限对话框的显示与否
  showSetRightVisible: false,
  //权限列表
  rightList: [],
  //选中的角色下的三级节点id数组
  rightIdArr: [],
  //给用户分配角色对话框的显示与否
  setRoleDialogVisible: false,
  //用户信息
  userInfo: {}
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})