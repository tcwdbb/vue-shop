<template>
  <div class="rights-list">
    <el-table :data="rightList" :stripe="true" :border="true">
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column label="权限名称" prop="authName"></el-table-column>
      <el-table-column label="路径" prop="path"></el-table-column>
      <el-table-column label="权限等级" prop="level">
        <template v-slot="scope">
          <el-tag v-if="scope.row.level === '0'">一级</el-tag>
          <el-tag v-else-if="scope.row.level === '1'" type="success">二级</el-tag>
          <el-tag v-else type="warning">三级</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "RightList",
  props: {
    rightList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="less" scoped>
</style>