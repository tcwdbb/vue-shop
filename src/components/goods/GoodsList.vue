<template>
  <div class="goods-list">
    <el-table :data="getterGoodsList" style="width: 100%" border stripe>
      <el-table-column type="index" width="100px"> </el-table-column>
      <el-table-column prop="goods_name" label="商品名称"> </el-table-column>
      <el-table-column prop="goods_price" label="商品价格(元)" width="110">
      </el-table-column>
      <el-table-column prop="goods_weight" label="商品重量" width="80">
      </el-table-column>
      <el-table-column prop="add_time" label="创建时间" width="155">
        <template v-slot="scope">{{
          scope.row.add_time | addDateFormat
        }}</template>
      </el-table-column>
      <el-table-column label="操作" width="130">
        <template v-slot="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="editGoods(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeGoods(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <diglog-box
      title="修改商品信息"
      :dialogVisible="dialogVisible"
      @hideDialog="hideDialog"
      @clickSure="clickSure"
    >
    <edit-goods :goodsInfo="goodsInfo"></edit-goods>
    </diglog-box>
  </div>
</template>

<script>
import { deleteGoods } from "network/goods/goods.js";
import { mapGetters, mapActions } from "vuex";
import { dateFormat } from "common/utils";
import DiglogBox from "../common/DiglogBox.vue";
import EditGoods from './EditGoods.vue';

export default {
  components: { DiglogBox, EditGoods },
  name: "GoodsList",
  props: {
    goodsList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      dialogVisible: false,
      goodsInfo: {}
    };
  },
  created() {
    this.getGoodsList();
  },
  computed: {
    ...mapGetters(["getterGoodsList"]),
  },
  methods: {
    ...mapActions(["getGoodsList"]),
    //点击删除商品
    async removeGoods(goods) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该文件, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult !== "confirm") {
        return this.$message.info("取消了删除");
      }
      //删除商品
      const res = await deleteGoods(goods.goods_id);
      if (res.meta.status !== 200) {
        return this.$message.error("删除商品失败");
      }
      this.$message.success("删除商品成功");
      //删除成功重新获取新数据
      this.getGoodsList();
    },
    //点击打开修改商品对话框
    editGoods(goods) {
      this.goodsInfo = goods;
      this.dialogVisible = true;
    },
    hideDialog(val) {
      this.dialogVisible = val;
    },
    clickSure(val) {
      this.dialogVisible = val;
    },
  },
  filters: {
    addDateFormat: (val) => {
      const date = new Date(val * 1000);
      return dateFormat("YYYY-mm-dd HH:MM:SS", date);
    },
  },
};
</script>

<style lang="less" scoped>
.goods-list {
  margin-top: 15px;
}
</style>