export default {
  //更改state中Breadcrumb的数据
  setBreadcrumb(state, payLoad) {
    state.breadcrumbList = [];
    state.breadcrumbList.push(...payLoad);
  },
  //更改state中roleId的数据
  setRoleId(state, payLoad) {
    state.roleId = payLoad;
  },
  //控制修改角色信息对话框的显示与隐藏
  setEditRoleIsShow(state, payload) {
    state.editRoleIsShow = payload;
  },
  //更改state中roleList的数据
  setRoleList(state, payload) {
    state.roleList = payload;
  },
  //控制添加角色对话框的显示与隐藏
  setAddRoleIsShow(state, payload) {
    state.addRoleIsShow = payload;
  },
  //控制权限对话框的显示隐藏
  setRightVisible(state, payLoad) {
    state.showSetRightVisible = payLoad;
  },
  //更改state中权限列表的数据
  setRightList(state, payload) {
    state.rightList = payload;
  },
  //更改选中的角色下的三级节点id数组
  setRightIdArr(state, payload) {
    state.rightIdArr = payload;
  },
  //更改分配角色对话框显示与否的值
  setUserRoleDialogVisible(state, payLoad) {
    state.setRoleDialogVisible = payLoad;
  },
  //更改state中userInfo数据
  setUserInfo(state, payload) {
    state.userInfo = payload
  },

  //设置state中商品分类数据
  setCategoriesList(state, [data,total]) {
    state.categoriesList = data;
    state.total = total;
  },
  //设置查询参数
  setQuerInfo(state, payLoad) {
    state.querInfo = payLoad
  },
  //保存添加分类数据
  setAddCateForm(state, payLoad){
    state.addCateForm = payLoad
  }
}

