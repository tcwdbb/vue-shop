<template>
  <div class="reports">
    <breadcrumb></breadcrumb>
    <card-box>
      <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
      <div id="main" ref="echartsRef" style="width: 750px; height: 400px"></div>
    </card-box>
  </div>
</template>

<script>
import Breadcrumb from "../breadcrumb/Breadcrumb.vue";
import * as echarts from "echarts";
import CardBox from "../card/CardBox";
import { getReportsData } from "network/reports.js";
export default {
  components: { Breadcrumb, CardBox },
  name: "Reports",
  data() {
    return {
      data: {},
      myChart: null,
      data1: {},
      options: {
        title: {
          text: "用户来源",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#E9EEF3",
            },
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            boundaryGap: false,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
      },
    };
  },
  created() {
    this.getReportsData();
    
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById("main"));
  },
  methods: {
    async getReportsData() {
      const res = await getReportsData();
      if (res.meta.status !== 200) {
        return this.$message.error("获取数据失败");
      }
      Object.assign(this.data, this.options, res.data);
      this.myChart.setOption(this.data);
    },
  },
};
</script>

<style>
</style>