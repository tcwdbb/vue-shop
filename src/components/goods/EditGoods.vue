<template>
  <div class="edit-goods">
    <el-form
        :model="goodsInfo"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="100px"
      >
        <el-form-item label="商品名称" prop="goods_name">
          <el-input v-model="goodsInfo.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="goods_price">
          <el-input v-model="goodsInfo.goods_price" type="number"></el-input>
        </el-form-item>
        <el-form-item label="商品重量" prop="goods_weight">
          <el-input v-model="goodsInfo.goods_weight" type="number"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="goods_number">
          <el-input v-model="goodsInfo.goods_number" type="number"></el-input>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import { editGoodsInfo } from 'network/goods/goods.js'
export default {
  name: "EditGoods",
  props: {
    goodsInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      editFormRules: {

      }
    }
  },
  mounted() {
    this.$bus.$on('resetField', () => {
      console.log(this.goodsInfo.goods_id);
      this.editGoodsInfo();
    })
  },
  methods: {
    async editGoodsInfo() {
      const res = await editGoodsInfo(this.goodsInfo);
      if(res.meta.status !== 200) {
        return this.$message.error('修改失败')
      }
      this.$message.success('修改成功')
    }
  }
};
</script>

<style lang="less" scoped>
</style>