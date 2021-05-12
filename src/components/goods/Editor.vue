<template>
  <div >
    <div id="editor"></div>
  </div>
</template>

<script>
import E from 'wangeditor'

export default {
  name: 'Editor',
  data() {
    return {
      editor: null,
      editorData: ''
    }
  },
  mounted() {
    const editor = new E('#editor');
    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = (newHtml) => {
       this.editorData = newHtml
       this.$emit('editorDataChange',this.editorData)
    }
    //创建编辑器
    editor.create();
    this.editor = editor;
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
</style>