import { getRoleList } from 'network/role.js'
export default {
  //获取角色列表
    async getRoleList({commit}) {
      const res = await getRoleList();
      if(res.meta.status != 200) {
        return this.$message.error('获取角色列表失败')
      }
      commit('setRoleList',res.data)
    }
}