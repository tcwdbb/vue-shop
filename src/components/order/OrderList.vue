<template>
  <div class="order-list">
    <el-table :data="orderList" border stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column
        prop="order_number"
        label="订单编号"
        width="200"
      ></el-table-column>
      <el-table-column prop="order_price" label="订单价格"></el-table-column>
      <el-table-column prop="order_pay" label="是否付款">
        <template v-slot="scope">
          <el-tag v-if="scope.row.order_pay === '1'" type="success"
            >已付款</el-tag
          >
          <el-tag v-else type="danger">未付款</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货"></el-table-column>
      <el-table-column prop="create_time" label="下单时间">
        <template v-slot="scope">
          {{ scope.row.create_time | createDateFormat }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-tooltip
            content="修改订单地址"
            :enterable="false"
            placement="bottom"
          >
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="showEditDiglog"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            content="查看物流进度"
            :enterable="false"
            placement="bottom"
          >
            <el-button
              type="success"
              size="mini"
              icon="el-icon-location-outline"
              @click="showProgresBox"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 底部分页 -->
    <pagination
      :total="getterOrderTotal"
      :querInfo="getterOrderQueryInfo"
      @changeSize="changeSize"
      @changePage="changePage"
    ></pagination>
    <!-- 修改地址对话框 -->
    <diglog-box
      v-if="type === 'address'"
      title="修改订单地址"
      :dialogVisible="dialogVisible"
      @hideDialog="hideDialog"
      @clickSure="clickSure"
    >
    <edit-order-address></edit-order-address>
    </diglog-box>
    <!-- 展示物流进度对话框 -->
    <diglog-box
      v-if="type === 'checkSchedule'"
      title="查看物流进度"
      :dialogVisible="dialogVisible"
      @hideDialog="hideDialog"
      @clickSure="clickSure"
      :isShowBtn="false"
    >
    <logistics-schedule></logistics-schedule>
    </diglog-box>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import Pagination from "../goods/categories/Pagination.vue";
import { dateFormat } from "common/utils.js";
import DiglogBox from "../common/DiglogBox.vue";
import EditOrderAddress from './EditOrderAddress.vue';
import LogisticsSchedule from './LogisticsSchedule.vue';
export default {
  components: { Pagination, DiglogBox, EditOrderAddress, LogisticsSchedule },
  name: "OrderList",
  data() {
    return {
      orderList: [],
      queryInfo: {},
      //控制修改订单地址的显示与否
      dialogVisible: false,
      type: ''
    };
  },
  created() {
    this.getOrdersList();
    this.queryInfo = {
      query: this.getterOrderQueryInfo.query,
      pagenum: this.getterOrderQueryInfo.pagenum,
      pagesize: this.getterOrderQueryInfo.pagesize,
    };
  },
  computed: {
    ...mapGetters([
      "getterOrderList",
      "getterOrderTotal",
      "getterOrderQueryInfo",
    ]),
  },
  methods: {
    ...mapMutations(["setOrderQueryInfo"]),
    ...mapActions(["getOrdersList"]),
    //监听子组件内每页展示条数的改变
    changeSize(newSize) {
      this.queryInfo.pagesize = newSize;
      this.setOrderQueryInfo(this.queryInfo);
      this.getOrdersList();
    },
    //监听子组件内页码的改变
    changePage(newPage) {
      this.queryInfo.pagenum = newPage;
      this.setOrderQueryInfo(this.queryInfo);
      this.getOrdersList();
    },
    //点击修改按钮打开修改订单地址对话框
    showEditDiglog() {
      this.dialogVisible = true;
      this.type = 'address'
    },
    //监听修改订单地址对话框发出的事件隐藏对话框
    hideDialog(val) {
      this.dialogVisible = val;
      this.type = ''
    },
    //监听修改订单地址对话框点击确定发出的事件隐藏对话框，并执行修改操作
    clickSure(val) {
      this.dialogVisible = val;
      this.type = ''
    },
    showProgresBox() {
      this.dialogVisible = true;
      this.type = 'checkSchedule';
    }
  },
  filters: {
    createDateFormat: (val) => {
      const date = new Date(val * 1000);
      return dateFormat("YYYY-mm-dd HH:MM:SS", date);
    },
  },
  watch: {
    //监分类列表数据的改变
    getterOrderList: {
      deep: true,
      handler(val) {
        this.orderList = val;
        //数据改变之后页面没有发生刷新，手动强制刷新
        this.$forceUpdate();
      },
    },
  },
};
</script>

<style lang="less" scoped>
.order-list {
  margin-top: 15px;
}
</style>