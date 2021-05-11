<template>
  <div class="params-dialog">
    <el-dialog
      :title="'添加' + this.titleText"
      :visible.sync="selfDialogVisible"
      width="50%"
      @close="closeDialogVisible"
    >
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
      >
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clickDialogVisible">取 消</el-button>
        <el-button type="primary" @click="clickAddParam">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addParams } from 'network/goods/params.js'
export default {
  name: "ParamsDialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    activeName: {
      type: String,
      default: "",
    },
    cateId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      addForm: {
        attr_name: '',
      },
      addFormRules: {
        attr_name: [
          { required: true, message: '请输入参数名称', trigger: 'blur' },
        ]
      },
    };
  },
  computed: {
    selfDialogVisible: {
      get() {
        return this.dialogVisible;
      },
      set(val) {
        this.$emit("diaVisible", val);
      },
    },
    //对话框标题
    titleText() {
      if (this.activeName === "many") {
        return "动态参数";
      }
      return "静态属性";
    },
  },
  methods: {
    //点击取消隐藏对话框
    clickDialogVisible() {
      this.selfDialogVisible = false;
    },
    //点击关闭重置对话框并隐藏
    closeDialogVisible() {
      this.$refs.addFormRef.resetFields();
      this.selfDialogVisible = false;
    },
    //点击按钮添加参数
    clickAddParam() {
      //提交时验证表单
      this.$refs.addFormRef.validate(valid => {
        if(!valid) return
        this.addParams();
      })
    },
    //添加参数
    async addParams() {
      const res = await addParams(this.cateId,{
        attr_name: this.addForm.attr_name,
        attr_sel: this.activeName,
      });
      if(res.meta.status !== 201) {
        return this.$message.error('添加参数失败')
      }
      this.$message.success('添加参数成功');
      this.selfDialogVisible = false;
      //重新获取当前参数列表
      this.$emit('refrshList');
    }
  },
};
</script>

<style>
</style>