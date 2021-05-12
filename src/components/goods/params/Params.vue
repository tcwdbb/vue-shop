<template>
  <div class="params">
    <breadcrumb></breadcrumb>
    <card-box>
      <!-- 警告提示区域 -->
      <el-alert
        title="注意：只允许为第三级分类设置相关参数！"
        :closable="false"
        type="warning"
        show-icon
      >
      </el-alert>
      <!-- 选择商品分类区域 -->
      <el-row class="cat-opt">
        <el-col>
          <span>选择商品分类：</span>
          <el-cascader
            :props="{
              expandTrigger: 'hover',
              value: 'cat_id',
              label: 'cat_name',
              children: 'children',
            }"
            v-model="selectedKeys"
            :options="categoryList"
            @change="cateChanged"
            clearable
          ></el-cascader>
        </el-col>
      </el-row>
      <!-- tab页签区域 -->
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <!-- 添加动态参数面板 -->
        <el-tab-pane label="动态参数" name="many">
          <!-- 添加参数按钮 -->
          <el-button
            :disabled="isBtnDisabled"
            type="primary"
            size="mini"
            @click="addDialogVisible"
            >添加参数</el-button
          >
          <!-- 动态参数表格 -->
          <el-table :data="manyTableData" border stripe>
            <!-- 展开行 -->
            <el-table-column type="expand">
              <template v-slot="scope">
                <el-tag
                  v-for="(item, index) of scope.row.attr_vals"
                  :key="index"
                  @close="clickRemove(scope.row, index)"
                  closable
                  >{{ item }}</el-tag
                >
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                ></el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index"></el-table-column>
            <el-table-column
              prop="attr_name"
              label="参数名称"
            ></el-table-column>
            <el-table-column label="操作">
              <template v-slot="scope">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-edit"
                  @click="editParams(scope.row)"
                  >修改</el-button
                >
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  @click="clickRemoveParams(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 添加静态参数面板 -->
        <el-tab-pane label="静态属性" name="only">
          <!-- 添加属性按钮 -->
          <el-button
            :disabled="isBtnDisabled"
            type="primary"
            size="mini"
            @click="addDialogVisible"
            >添加属性</el-button
          >
          <!-- 静态属性表格 -->
          <el-table :data="onlyTableData" border stripe>
            <!-- 展开行 -->
            <el-table-column type="expand">
              <template v-slot="scope">
                <el-tag
                  v-for="(item, index) of scope.row.attr_vals"
                  :key="index"
                  @close="clickRemove(scope.row, index)"
                  closable
                  >{{ item }}</el-tag
                >
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                ></el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index"></el-table-column>
            <el-table-column
              prop="attr_name"
              label="参数名称"
            ></el-table-column>
            <el-table-column label="操作">
              <template v-slot="scope">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-edit"
                  @click="editParams(scope.row)"
                  >修改</el-button
                >
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  @click="clickRemoveParams(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </card-box>
    <!-- 添加参数对话框 -->
    <params-dialog
      @refrshList="refrshList"
      @diaVisible="diaVisible"
      :cateId="cateId"
      :dialogVisible="dialogVisible"
      :activeName="activeName"
    ></params-dialog>
    <!-- 修改参数对话框 -->
    <edit-params-dialog
      @refrshList="refrshList"
      @editDiaVisible="editDiaVisible"
      :EditDialogVisible="EditDialogVisible"
      :activeName="activeName"
      :paramsInfo="paramsInfo"
    ></edit-params-dialog>
  </div>
</template>

<script>
import Breadcrumb from "../../breadcrumb/Breadcrumb.vue";
import CardBox from "../../card/CardBox.vue";
import { goodsCategoryMixin } from 'common/mixin.js'

import {
  getParamsList,
  selectParams,
  removeParams,
  editParamsItem
} from "network/goods/params.js";

import ParamsDialog from "./ParamsDialog.vue";
import EditParamsDialog from "./EditParamsDialog.vue";

export default {
  components: { CardBox, Breadcrumb, ParamsDialog, EditParamsDialog },
  mixins: [goodsCategoryMixin],
  name: "params",
  data() {
    return {
      //联级选择框双向绑定到的数组
      selectedKeys: [],
      //商品分类列表
      // categoryList: [],
      //被激活的页签的名称
      activeName: "many",
      //上一次被激活的页签名称
      oldActiveName: "",
      //动态参数的数据
      // manyTableData: [],
      //静态属性的数据
      // onlyTableData: [],
      //添加对话框的显示与否
      dialogVisible: false,
      //修改参数对话框的显示与否
      EditDialogVisible: false,
      //要修改的参数数据
      paramsInfo: {},
    };
  },
  created() {
    this.getGoodsCategoryList();
  },
  computed: {
    //判断按钮是否是禁用
    isBtnDisabled() {
      if (this.selectedKeys.length < 3) {
        return true;
      }
      return false;
    },
    //获取当前选中分类的id
    cateId() {
      if (this.selectedKeys.length === 3) {
        return this.selectedKeys[this.selectedKeys.length - 1];
      }
      return null;
    },
  },
  methods: {
    cateChanged() {
      //如果cateId不为空才发送请求
      if (this.selectedKeys.length === 3) {
        return this.getParamsList();
      }
      this.selectedKeys = [];
        this.manyTableData = [];
        this.onlyTableData = [];
    },
    //获取分类列表
    // async getGoodsCategoryList() {
    //   const res = await getGoodsCategoryList({ type: 3 });
    //   if (res.meta.status !== 200) {
    //     return this.$message.error("获取分类列表失败");
    //   }
    //   this.categoryList = res.data;
    // },
    //面板点击切换的时候请求参数列表
    handleTabClick() {
      //如果一直点击同一个选项不重复发送请求，或者cateId为空时也不发送请求
      if (this.oldActiveName === this.activeName || !this.cateId) return;
      this.oldActiveName = this.activeName;
      this.getParamsList();
    },
    //根据所选分类id和当前所处的面变获取对应的参数列表
    async getParamsList() {
      const res = await getParamsList(this.cateId, this.activeName);
      if (res.meta.status !== 200) {
        return this.$message.error("获取分类参数列表失败");
      }
      //将attr_vals从字符串转换成数组保存在item.attr_vals中
      res.data.forEach((item) => {
        item.attr_vals = item.attr_vals ? item.attr_vals.split(" ") : [];
        //控制文本框的显示与隐藏
        item.inputVisible = false;
        //文本框中输入的值
        item.inputValue = "";
      });
      if (this.activeName === "many") {
        this.manyTableData = res.data;
      } else {
        this.onlyTableData = res.data;
      }
    },
    //监听子组件发送的事件隐藏对话框
    diaVisible(val) {
      this.dialogVisible = val;
    },
    //显示添加参数对话框
    addDialogVisible() {
      this.dialogVisible = true;
    },
    //添加参数后重新获取列表数据
    refrshList() {
      this.getParamsList();
    },
    //根据id查询参数后显示修改修改参数对话框
    editParams(paramsInfo) {
      this.selectParams(paramsInfo.attr_id);
      this.EditDialogVisible = true;
    },
    //监听子组件事件，隐藏修改参数对话框
    editDiaVisible(val) {
      this.EditDialogVisible = val;
    },
    //根据id查询参数信息
    async selectParams(attrId) {
      console.log(attrId);
      const res = await selectParams(this.cateId, attrId, this.activeName);
      if (res.meta.status !== 200) {
        console.log(res.meta.msg);
        return this.$message.error("获取参数信息失败");
      }
      this.paramsInfo = res.data;
    },
    //点击删除参数
    async clickRemoveParams(params) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该文件, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult != "confirm") {
        return this.$message.info("取消了删除");
      }
      this.removeParams(params);
    },
    //根据id删除参数
    async removeParams(params) {
      const res = await removeParams(params);
      if (res.meta.status !== 200) {
        return this.$message.error("删除失败");
      }
      this.$message.success("删除成功");
      //删除成功重新获取最新数据
      this.getParamsList();
    },
    //点击按钮显示文本输入框
    showInput(params) {
      params.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    //失去焦点或按下回车添加新tag
    handleInputConfirm(params) {
      if (params.inputValue.trim().length === 0) {
        params.inputVisible = false;
        params.inputValue = "";
        return;
      }
      //没有return执行后续处理
      //创建一个变量保存这个数组
      const attr_vals = params.attr_vals.join(' ');
      //将数组克隆并添加新增的参数
      let atrr = attr_vals.split(' ');
      atrr.push(params.inputValue.trim())
      params.inputVisible = false;
      //将这个克隆的数组作为参数执行新增
      this.editParamsItem(params,atrr.join(' '));
      //新增成功后更新页面
      params.attr_vals.push(params.inputValue.trim());
      params.inputValue = "";
    },
    //点击删除动态参数下的val
    clickRemove(params, index) {
      params.attr_vals.splice(index, 1);
      this.editParamsItem(params,params.attr_vals.join(' '));
      
    },
    //修改参数
    async editParamsItem(params, str) {
      const res = await editParamsItem(params, str);
      if(res.meta.status !== 200) {
        return this.$message.error('修改参数项失败');
      }
      this.$message.success('修改参数项成功');
      this.selfDialogVisible = false;
      
    }
  },
};
</script>

<style lang="less" scoped>
.cat-opt {
  margin: 15px 0;
}

.el-tag {
  margin: 5px;
}

.input-new-tag {
  width: 200px;
}
</style>