<template>
  <div class="categories-list">
    <el-row>
      <el-col>
        <el-button type="primary" @click="showDiglog">添加分类</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table
        :data="getCategory"
        style="width: 100%"
        row-key="cat_id"
        border
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="cat_name" label="分类名称" width="180">
        </el-table-column>
        <el-table-column prop="cat_deleted" label="是否有效" width="180">
          <template v-slot="scope">
            <i
              v-if="scope.row.cat_deleted === false"
              class="el-icon-success"
            ></i>
            <i v-else class="el-icon-error"></i>
          </template>
        </el-table-column>
        <el-table-column prop="cat_level" label="排序">
          <template v-slot="scope">
            <el-tag v-if="scope.row.cat_level === 0">一级</el-tag>
            <el-tag v-else-if="scope.row.cat_level === 1" type="success"
              >二级</el-tag
            >
            <el-tag v-else type="warning">三级</el-tag>
          </template>
        </el-table-column>
        <el-table-column>
          <template v-slot="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="editCategory(scope.row)"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" icon="el-icon-delete"
              @click="removeCate(scope.row)">删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 修改分类区域 -->
    <edit-category
      :categoryInfo="categoryInfo"
      :editDialogVisible="editDialogVisible"
      @clickEditDialogVisible="clickEditDialogVisible"
    ></edit-category>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import EditCategory from "./EditCategory.vue";
import { selectCateById, removeCateById } from 'network/goods/categories'

export default {
  components: { EditCategory },
  name: "CategoriesList",
  data() {
    return {
      getCategory: [],
      editDialogVisible: false,
      //当前要修改的分类信息
      categoryInfo: {}
    };
  },
  created() {
    this.getCategoriesList();
  },
  computed: {
    ...mapGetters(["getCategoryList"]),
  },
  methods: {
    ...mapActions(["getCategoriesList"]),
    //显示添加分类对话框
    showDiglog() {
      this.$emit("showDiglog", true);
    },
    //显示修改分类对话框
    editCategory(category) {
      this.selectCateById(category.cat_id);
      this.editDialogVisible = true;
    },
    //隐藏修改分类对话框
    clickEditDialogVisible() {
      this.editDialogVisible = false;
    },
    //根据id查询当前分类信息
    async selectCateById(id) {
      const res = await selectCateById(id);
      if(res.meta.status !== 200) {
        console.log(res.meta.msg);
        return this.$message.error('获取分类信息失败')
      }
      this.categoryInfo = res.data;
    },
    //点击删除删除分类
    async removeCate(category) {
      const confirmResult = await this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).catch(err => err);
      if(confirmResult !== 'confirm') {
        return this.$message.info('取消了删除');
      }
      const res = await removeCateById(category.cat_id);
      if(res.meta.status !== 200) {
        return this.$message.error('删除分类失败')
      }
      this.$message.success('删除分类成功')
      this.getCategoriesList();
    }
    
  },
  watch: {
    //监分类列表数据的改变
    getCategoryList: {
      deep: true,
      handler(val) {
        console.log(123123);
        this.getCategory = val;
        //数据改变之后页面没有发生刷新，手动强制刷新
        this.$forceUpdate();
      },
    },
  },
};
</script>

<style lang="less" scoped>
.el-icon-success {
  color: green;
}

.el-icon-error {
  color: red;
}
</style>