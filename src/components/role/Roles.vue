<template>
  <div class="roles">
    <breadcrumb></breadcrumb>
    <card-box>
      <!-- 添加角色区域 -->
      <el-row>
        <el-button type="primary" @click="addRole">添加角色</el-button>
      </el-row>
      <!-- 角色列表区域 -->
      <role-list :roleList="roleList"></role-list>
    </card-box>
    <add-role></add-role>
    <set-right-dialog></set-right-dialog>
  </div>
</template>

<script>
import Breadcrumb from '../breadcrumb/Breadcrumb.vue'
import CardBox from '../card/CardBox'
import RoleList from './childComps/RoleList.vue'
import AddRole from './childComps/AddRole'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import SetRightDialog from './childComps/SetRightDialog.vue'

export default {
  components: { Breadcrumb, CardBox, RoleList, AddRole, SetRightDialog },
  name: 'Roles',
  data() {
    return {
      // roleList: []
    }
  },
  computed: {
    ...mapGetters(['roleList'])
  },
  created() {
    this.getRoleList();
  },
  methods: {
    ...mapActions(['getRoleList']),
    ...mapMutations(['setAddRoleIsShow']),
    addRole() {
      this.setAddRoleIsShow(true);
    }
  }
}
</script>

<style>

</style>