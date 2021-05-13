<template>
  <div class="logistics-schedule">

  </div>
</template>

<script>
import { getLogisticsInfo } from 'network/orders.js'
export default {
  name: 'LogisticsSchedule',
  created() {
    this.getLogisticsInfo('1106975712662');
  },
  methods: {
    async getLogisticsInfo(id) {
      const res = await getLogisticsInfo(id);
      if(res.meta.status !== 200) {
        return this.$message.error('物流信息获取失败')
      }
      console.log(res);
    }
  }
}
</script>

<style lang="less" scoped>

</style>