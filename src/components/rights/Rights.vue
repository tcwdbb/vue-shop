<template>
  <div class="rights">
    <breadcrumb></breadcrumb>
    <card-box>
      <right-list :rightList="rightList"></right-list>
    </card-box>
  </div>
</template>

<script>
import Breadcrumb from '../breadcrumb/Breadcrumb.vue'
import CardBox from '../card/CardBox'

import { getRightsList } from 'network/rights.js'
import RightList from './childComps/RightList.vue'

export default {
  components: { Breadcrumb,CardBox, RightList },
  name: 'Rights',
  data() {
    return {
      type: 'list',
      rightList: []
    }
  },
  created() {
    this.getRightsList();
  },
  methods: {
    async getRightsList() {
      const res = await getRightsList(this.type);
      if(res.meta.status !== 200) {
        return this.$message.error('获取权限列表失败！');
      }
      this.rightList = res.data;
      console.log(this.rightList);
    }
  }
}
</script>

<style lang="less" scoped>

</style>