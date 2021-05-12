<template>
  <div class="add">
    <breadcrumb></breadcrumb>
    <!-- 卡片视图区域 -->
    <card-box class="card-box">
      <!-- 提示消息区域 -->
      <el-alert title="添加商品信息" type="info" center show-icon> </el-alert>
      <!-- 步骤条 -->
      <el-steps :active="active * 1" finish-status="success" align-center="">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
        label-position="top"
      >
        <el-tabs
          v-model="active"
          tab-position="left"
          :before-leave="beforeTabLeave"
          @tab-click="tabClicked"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addForm.goods_number" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                :props="{
                  expandTrigger: 'hover',
                  value: 'cat_id',
                  label: 'cat_name',
                  children: 'children',
                }"
                v-model="addForm.goods_cat"
                :options="categoryList"
                @change="cateChanged"
                clearable
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-form-item
              :label="item.attr_name"
              v-for="(item, index) of manyTableData"
              :key="index"
            >
              <!-- 复选框 -->
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  border
                  v-for="(subItem, subIndex) of item.attr_vals"
                  :key="subIndex"
                  :label="subItem"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item
              v-for="(item, index) of onlyTableData"
              :key="index"
              :label="item.attr_name"
            >
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <!-- action表示图片要上传到的后台API地址 -->
            <el-upload
              class="upload-demo"
              :action="uploadURL"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture"
              :headers="hearderObj"
              :on-success="handleSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane id="" label="商品内容" name="4">
            <editor @editorDataChange="editorDataChange"></editor>
            <el-button type="primary" @click="addGoods" class="addGoods">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </card-box>
    <el-dialog
      title="图片预览"
      :visible.sync="previewVisible"
      width="50%"
    >
      <img :src="imgURL" alt="" class="previerImg">
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from "../breadcrumb/Breadcrumb.vue";
import { mapGetters, mapMutations } from "vuex";
import CardBox from "../card/CardBox.vue";
import { goodsCategoryMixin } from "common/mixin.js";
import { getParamsList } from "network/goods/params.js";
import { addGoodsInfo } from 'network/goods/goods.js'
import { deepClone } from 'common/utils.js'
import Editor from './Editor'

export default {
  components: { Breadcrumb, CardBox, Editor },
  mixins: [goodsCategoryMixin],
  name: "Add",
  data() {
    return {
      active: "0",
      //商品参数列表
      paramsList: [],
      //上传图片的url地址
      uploadURL: "http://www.ysqorz.top:8888/api/private/v1/upload",
      //图片上传组件的hearder请求头对象
      hearderObj: {
        Authorization: window.sessionStorage.getItem("token"),
      },
      previewVisible: false,
      imgURL: '',
      //添加商品表单数据
      addForm: {
        goods_name: "",
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        goods_cat: [],
        pics: [],
        goods_introduce: '',
        attrs: []
      },
      addFormRules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        goods_price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
        ],
        goods_weight: [
          { required: true, message: "请输入商品重量", trigger: "blur" },
        ],
        goods_number: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
        ],
        goods_cat: [
          { required: true, message: "请选择商品分类", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.setBreadcrumb([this.getBreadcrumb[0], "添加商品"]);
    this.getGoodsCategoryList();
  },
  computed: {
    ...mapGetters(["getBreadcrumb"]),
    //获取分类ID
    cateId() {
      if (this.addForm.goods_cat.length === 3) {
        return this.addForm.goods_cat[this.addForm.goods_cat.length - 1];
      }
      return null;
    },
  },
  methods: {
    ...mapMutations(["setBreadcrumb"]),
    //监听联级菜单的改变
    cateChanged() {
      console.log(this.addForm.goods_cat);
      if (this.addForm.goods_cat.length !== 3) {
        this.addForm.goods_cat = [];
        this.$message.info("只能选择三级分类");
      }
    },
    //tab标签页切换监听
    beforeTabLeave(activeName, oldActiveName) {
      if (oldActiveName === "0" && this.addForm.goods_cat.length !== 3) {
        this.$message.error("请先选择商品分类");
        return false;
      }
    },
    //监听tab被选中
    tabClicked() {
      switch (this.active) {
        case "1":
          this.getParamsList("many");
          break;
        case "2":
          this.getParamsList("only");
      }
    },
    //获取参数项列表
    async getParamsList(sel) {
      const res = await getParamsList(this.cateId, sel);
      if (res.meta.status !== 200) {
        return this.$message.error("获取参数列表失败");
      }
      //判断时动态参数还是静态属性，只有动态参数才需要转换成数组
      if (sel === "many") {
        res.data.forEach((item) => {
          item.attr_vals =
            item.attr_vals.length === 0 ? [] : item.attr_vals.split(",");
        });
        return this.manyTableData = res.data;
      }
      this.onlyTableData = res.data;
    },
    //处理图片预览效果
    handlePreview(file) {
      this.previewVisible = true;
      this.imgURL = 'http://www.ysqorz.top:8888/' + file.response.data.tmp_path;
    },
    //处理移除图片的操作
    handleRemove(file) {
      //在数组中查找当前图片的索引
      const index = this.addForm.pics.findIndex(
        (item) => item.pic === file.response.data.tmp_path
      );
      //从数组中删除当前图片
      this.addForm.pics.splice(index, 1);
    },
    //监听图片上传成功事件
    handleSuccess(response) {
      this.addForm.pics.push({ pic: response.data.tmp_path });
    },
    //监听富文本编辑器内容的改变
    editorDataChange(content) {
      this.goods_introduce = content;
    },
    //点击按钮添加商品
    addGoods() {
      this.$refs.addFormRef.validate( valid => {
        if(!valid) {
          return this.$message.error('请填写必要的表单项')
        }
        //执行添加商品
        //使用深拷贝将addForm对象拷贝一份进行修改数据
        const newAddForm = deepClone(this.addForm);
        newAddForm.goods_cat = newAddForm.goods_cat.join(',');
        newAddForm.attrs = [];
        const newArr = [...this.manyTableData,...this.onlyTableData];
        // const newArr = this.manyTableData.concat(this.onlyTableData);
        newArr.forEach(item => {
          const obj = {};
          //判断attr_write的值如果是list需要将数组转换成字符串
          if(item.attr_write === 'list') {
            item.attr_vals = item.attr_vals.join(',');
          }
          obj.attr_id = item.attr_id;
          obj.attr_vals = item.attr_vals;
          newAddForm.attrs.push(obj);
        })
        this.addGoodsInfo(newAddForm);
      })
    },
    //添加商品
    async addGoodsInfo(newAddForm) {
      const res = await addGoodsInfo(newAddForm);
      if(res.meta.status !== 201) {
        return this.$message.error('添加商品失败');
      }
      this.$message.success('添加商品成功');
      //重置表单
      this.$refs.addFormRef.resetFields();
      this.$router.push('/goods')
    }
  },
};
</script>

<style lang="less" scoped>
.el-steps {
  margin-top: 15px;
}

.el-tabs {
  margin-top: 15px;
}

.card-box {
  height: 100%;
}

.el-checkbox {
  margin: 0 10px 0 0 !important;
}

.previerImg {
  width: 100%;
}

.addGoods {
  margin-top: 15px;
}
</style>