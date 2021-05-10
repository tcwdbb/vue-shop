import { getRoleList } from 'network/role.js'
import { getGoodsCategoryList } from 'network/goods/categories.js'
export default {
  //获取角色列表
    async getRoleList({commit}) {
      const res = await getRoleList();
      if(res.meta.status != 200) {
        return this.$message.error('获取角色列表失败')
      }
      commit('setRoleList',res.data)
    },
    //获取商品分类列表
    async getCategoriesList({state, commit}) {
      const res = await getGoodsCategoryList(state.querInfo);
      if(res.meta.status !== 200) {
        return this.$message.error('获取分类列表失败')
      }
      commit('setCategoriesList',[res.data.result,res.data.total]);
    }
}