<template>
  <div class="diglog-box">
    <el-dialog
      :title="title"
      :visible="dialogVisible"
      width="50%"
      @close="closeDiglog"
    >
      <slot></slot>
      <span v-if="isShowBtn" slot="footer" class="dialog-footer">
        <el-button @click="clickDialogVisible">取 消</el-button>
        <el-button type="primary" @click="clickSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "DiglogBox",
  props: {
    title: {
      type: String,
      default: "提示",
    },
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    //判断是否需要显示底部按钮
    isShowBtn: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    //点击向父组件发送事件隐藏对话框
    clickDialogVisible() {
      this.$emit("hideDialog", false);
    },
    //点击确定隐藏对话框
    clickSure() {
      this.$emit("clickSure", false);
    },
    //关闭对话框
    closeDiglog() {
      //发送事件总线清空对话框
      this.$bus.$emit('resetField');
      
      this.$emit("hideDialog", false);
    },
  },
};
</script>

<style>
</style>