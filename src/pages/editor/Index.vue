<template>
  <div class="editor-index">
    <!--顶部各种组件列表-->
    <the-tools></the-tools>
    <!--region 中间区域分为三个区间-->
    <div class="index-center" ref="centerBox">
      <!--左边在线模板列表-->
      <the-template-list></the-template-list>
      <!--内容面板 编辑-->
      <div class="editor-box">
        <the-editor-container ref="editorContainer"></the-editor-container>
      </div>
      <!--右侧页面列表-->
      <the-page-list></the-page-list>
      <!--组件属性设置面板-->
      <the-comp-props-config></the-comp-props-config>
      <!--组件右击图层设置面板-->
      <the-comp-layer-manager></the-comp-layer-manager>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
import ThePageList from './components/ThePageList'
import TheTemplateList from './components/TheTemplateList'
import TheTools from './components/TheTools'
import TheEditorContainer from './components/TheEditorContainer'
import TheCompPropsConfig from './components/TheCompPropsConfig'
import TheCompLayerManager from './components/TheCompLayerManager'

export default {
  components: {
    ThePageList,
    TheTemplateList,
    TheTools,
    TheEditorContainer,
    TheCompPropsConfig,
    TheCompLayerManager
  },
  data () {
    return {
      toolJson: {},
      panelWidthAndHeight: {
        width: 200,
        height: 400
      }
    }
  },
  created () {
    // 初始化
    this.$store.dispatch('initPageEditor')
  },
  mounted () {
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss">
@import "../../styles/variables";
@import "../../styles/mixin";

.editor-index {
  background-color: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .index-center {
    box-sizing: border-box;
    flex: 0 0 calc(#{"100% - "+ $tool-header-height +""});
    display: flex;
    flex-direction: row;
    position: relative;
    @include scrollBar;
    .editor-box {
      box-sizing: border-box;
      width: 100%;
      overflow-y: auto;
      padding: 40px 0;
      background-color: #eee;
    }
  }
}
</style>
