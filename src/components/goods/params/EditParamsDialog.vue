<template>
  <div class="edit-params-dialog">
    <el-dialog
      :title="'修改' + this.titleText"
      :visible.sync="selfDialogVisible"
      width="50%"
      @close="closeDialogVisible"
    >
      <el-form
        :model="paramsInfo"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="100px"
      >
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="paramsInfo.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clickDialogVisible">取 消</el-button>
        <el-button type="primary" @click="clickEditParam">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { editParams } from 'network/goods/params.js'

export default {
  name: 'EditParamsDialog',
  data() {
    return {
      editFormRules: {
        attr_name: [
          { required: true, message: '请输入参数名称', trigger: 'blur' },
        ]
      },
    }
  },
  props: {
    paramsInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    EditDialogVisible: {
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
  computed: {
    selfDialogVisible: {
      get() {
        return this.EditDialogVisible;
      },
      set(val) {
        this.$emit("editDiaVisible", val);
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
      this.$refs.editFormRef.resetFields();
      this.selfDialogVisible = false;
    },
    //点击按钮修改参数
    clickEditParam() {
      //提交时验证表单
      this.$refs.editFormRef.validate( valid => {
        if(!valid) return
        this.editParams();
      })
    },
    //修改参数
    async editParams() {
      const res = await editParams(this.paramsInfo);
      if(res.meta.status !== 200) {
        console.log(res.meta.msg);
        console.log(this.paramsInfo.attr_sel);
        return this.$message.error('修改失败');
      }
      this.$message.success('修改成功');
      this.selfDialogVisible = false;
      //修改后发送事件刷新列表
      this.$emit('refrshList');
      
    }
  }
}
</script>

<style>

</style>