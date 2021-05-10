<template>
  <div class="add-category">
    <el-form
      :model="addCateForm"
      :rules="rules"
      ref="addCateFormRef"
      label-width="100px"
    >
      <el-form-item label="分类名称" prop="cat_name">
        <el-input v-model="addCateForm.cat_name"></el-input>
      </el-form-item>
      <el-form-item label="父级分类">
        <el-cascader
          :props="{
            expandTrigger: 'hover',
            value: 'cat_id',
            label: 'cat_name',
            children: 'children',
            checkStrictly: true,
          }"
          v-model="selectedKeys"
          :options="categoryList"
          @change="parentCateChanged"
          clearable
        ></el-cascader>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: "AddCategory",
  props: {
    categoryList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      rules: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
      },
      addCateForm: {
        //将要添加的分类名称
        cat_name: "",
        //父级分类的id
        cat_pid: 0,
        //分类的等级，默认要添加的时一级分类
        cat_level: 0,
      },
      //选中的父级分类id数组
      selectedKeys: [],
    };
  },
  mounted() {
    //清空对话框内内容
    this.$bus.$on('resetField',() => {
      this.$refs.addCateFormRef.resetFields();
      this.selectedKeys = [];
    })
  },
  methods: {
    ...mapMutations(['setAddCateForm']),
    parentCateChanged() {
      if (this.selectedKeys.length > 0) {
        //父级分类的id
        this.addCateForm.cat_pid = this.selectedKeys[
          this.selectedKeys.length - 1
        ];
        //当前分类的等级
        this.addCateForm.cat_level = this.selectedKeys.length;
       
      } else {
        //父级分类的id
        this.addCateForm.cat_pid = 0;
        //当前分类的等级
        this.addCateForm.cat_level = 0;
      }
    },
  },
  watch: {
    //监听addCateForm的改变并将值更新到vuex中
    addCateForm: {
      deep: true,
      handler(newVal) {
        this.setAddCateForm(this.addCateForm);
      }
    }
  }
};
</script>

<style scoped>
.el-cascader {
  width: 100%;
}
</style>