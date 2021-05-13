<template>
  <div class="edit-order-address">
    <el-form :model="orderInfo" :rules="orderFormRules" ref="orderFormRef" label-width="100px">
      <el-form-item label="省市区/县" prop="address1">
        <el-cascader
          v-model="orderInfo.address1"
          :options="cityData"
          :props="{ expandTrigger: 'hover', value: 'value', label: 'label', children: 'children'}"
          @change="handleChange"
          clearable
        ></el-cascader>
      </el-form-item>
      <el-form-item label="详细地址" prop="address2">
        <el-input v-model="orderInfo.address2"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import cityData from 'common/city_data2017_element.js'

export default {
  name: "EditOrderAddress",
  data() {
    return {
      orderInfo: {
        address1: [],
        address2: ''
      },
      cityData,
      orderFormRules: {
        address1: [
          { required: true, message: '请选择省市区/县', trigger: 'blur' },
        ],
        address2: [
          { required: true, message: '请输入详细地址', trigger: 'blur' },
        ]
      }
    }
  },
  mounted() {
    // this.$bus.$on('resetField', () => {
    //   this.$refs.orderFormRef.resetFields();
    // })
  },
  methods: {
    handleChange() {
      
    },
  }
};
</script>

<style lang="less" scoped>
.el-cascader {
  width: 100%;
}
</style>