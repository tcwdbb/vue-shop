<template>
  <div class="pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="querInfo.pagenum"
      :page-sizes="pagesizes"
      :page-size="querInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>

export default {
  name: 'Pagination',
  props: {
    querInfo: {
      type: Object
    },
    total: {
      type: Number
    },
    pagesizes: {
      type: Array,
      default() {
        return [2,4,5,6]
      }
    }
  },
  methods: {
    //监听size的改变向父组件发送事件
    handleSizeChange(newSize) {
      this.$emit('changeSize',newSize);
      
    },
    //监听page的改变向父组件发送事件
    handleCurrentChange(newPage) {
      this.$emit('changePage',newPage);
      
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  margin-top: 5px;
}
</style>