export default {
  getBreadcrumb(state) {
    return state.breadcrumbList;
  },
  //获取state中roleList的数据
  roleList(state) {
    return state.roleList;
  },
  //获取state中addRoleIsShow的数据
  roleIsShow(state) {
    return state.addRoleIsShow;
  },
  //获取state中showSetRightVisible的数据
  setRightIsShow(state) {
    return state.showSetRightVisible;
  },
  //获取state中setRoleDialogVisible的值
  getRoleDialogVisible(state) {
    return state.setRoleDialogVisible;
  },
  //获取用户信息
  getUserInfo(state) {
    return state.userInfo;
  },
  //获取分类列表查询参数
  getCategoryListQuerInfo(state) {
    return state.querInfo;
  },
  //获取分类列表数据
  getCategoryList(state) {
    return state.categoriesList;
  },
  //获取分类列表总条数
  getTotal(state) {
    return state.total;
  },
  //获取要添加的分类数据
  getAddCateForm(state) {
    return state.addCateForm;
  }
}