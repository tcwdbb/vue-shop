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
  }
}