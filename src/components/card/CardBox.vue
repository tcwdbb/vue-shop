<template>
    <el-card class="card-box">
      <slot></slot>
    </el-card>
</template>

<script>
export default {
  name: 'CardBox'
}
</script>

<style lang="less" scoped>
  .card-box {
    margin-top: 15px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  }
</style>