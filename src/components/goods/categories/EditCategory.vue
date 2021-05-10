<template>
  <div class="eidt-category">
    <el-dialog
      title="修改分类"
      :visible="editDialogVisible"
      width="50%"
      @close="closeDiglog"
    >
      <el-form
      ref="editCateInfo"
      :model="categoryInfo"
      label-width="80px"
      :rules="cateFormRules"
    >
      <el-form-item label="分类名称" prop="cat_name">
        <el-input v-model="categoryInfo.cat_name"></el-input>
      </el-form-item>
    </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clickEditDialogVisible">取 消</el-button>
        <el-button type="primary" @click="clickSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { editCategory } from 'network/goods/categories.js'
import { mapActions } from 'vuex'

export default {
  name: "EditCategory",
  props: {
    editDialogVisible: {
      type: Boolean,
      default: false
    },
    categoryInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      cateFormRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    ...mapActions(['getCategoriesList']),
    //点击取消隐藏修改分类对话框
    clickEditDialogVisible() {
      this.$emit('clickEditDialogVisible')
    },
    clickSure() {
      this.editCategory();
      this.$emit('clickEditDialogVisible')
    },
    //点击关闭隐藏修改分类对话框
    closeDiglog() {
      this.$emit('clickEditDialogVisible')
    },
    //提交修改后的信息
    async editCategory() {
      const res = await editCategory(this.categoryInfo);
      if(res.meta.status !== 200) {
        return this.$message.error('修改分类信息失败')
      }
      this.$message.success('修改分类信息成功');
      this.getCategoriesList();
    }
  }
};
</script>

<style>
</style>