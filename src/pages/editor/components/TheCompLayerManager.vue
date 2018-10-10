<!--region 图层设置面板-->
<template>
  <div ref="layerManagerPanel" class="the-comp-layer-manager-page" v-if="layerPanel && layerPanel.show">
    <div :class="isMouseDown ? 'header pointer-events': 'header'">
      <div class="title" ref="header" @mousedown="handleDragMouseDown">图层设置</div>
      <div class="close">
        <span class="axon-icon" v-html="'&#xe622;'" @click="closeLareyPanel()"></span>
      </div>
    </div>
    <div class="layer-panel-list">
      <ul>
        <li @click="handRemove">删除组件</li>
        <li @click="handleCopyComp">拷贝组件</li>
        <!---图层显示依据数组的降序排练--关于图层数据的操作要反过来-->
        <li @click="handleSwapItem('down')">上移一层</li>
        <li @click="handleSwapItem('up')">下移一层</li>
        <li @click="handleSwapItem('bottom')">置顶</li>
        <li @click="handleSwapItem('top')">置底</li>
      </ul>
    </div>
  </div>
</template>
<!--endregion-->
<script>
import { throttle } from '../../../assets/utils/util.js'
import SwapArrayItem from '../../../assets/utils/swapArrayItem.js'

export default {
  components: {},
  data () {
    return {
      isMouseDown: false, // 鼠标是否按住可拖放区域
      dragObj: {
        initX: 0,
        indexY: 0,
        width: 160,
        height: 48
      } // 拖动对象位置
    }
  },
  created () {
  },
  mounted () {
    document.addEventListener('mousemove', (e) => { this.throttleMove(e) })
    document.addEventListener('mouseup', (e) => { this.handleDragMouseUp(e) })
  },
  computed: {
    // 取图层信息
    layerPanel () {
      return this.$store.getters.layerPanel
    },
    // 取当前页面ID
    curPageId () {
      return this.$store.getters.curPage.id
    },
    // 取当前页面中所有组件
    curPageComps () {
      return this.$store.getters.curPage.comps
    },
    // 取当前正在编辑的组件
    curCompId () {
      return this.$store.state.components.curCompId
    }
  },
  watch: {},
  methods: {
    // 关闭图层面板
    closeLareyPanel () {
      this.$store.dispatch('closeLayerPanel')
    },
    // 删除当前组件
    handRemove () {
      let compId = this.curCompId
      // 删除当前组件
      this.$store.dispatch('removeComp', compId)
      // 将组件从当前页面中移除
      this.$store.dispatch('removeComponentToPage', compId)
      // 关闭图层面板
      this.$store.dispatch('closeLayerPanel')
    },
    // 拷贝当前组件
    handleCopyComp () {
      this.$store.dispatch('copyComp', this.curCompId)
    },
    // 交换数组元素
    handleSwapItem (operateName) {
      // 获取当前数组下标
      let index = this.accpetIndex(this.curPageComps, this.curCompId)
      SwapArrayItem.swapByOperate(this.curPageComps, index, operateName)
    },
    /**
     * 获取下标
     * @param ary
     * @param id
     * @returns {number}
     */
    accpetIndex (ary, id) {
      var index = -1
      for (let i = 0; i < ary.length; i++) {
        if (ary[i] && ary[i].id === id) {
          index = i
        }
      }
      return index
    },
    // 拖动：当鼠标点下的时候，给要拖动的元素附上初始值
    handleDragMouseDown (e) {
      this.isMouseDown = true
      this.dragObj.initX = e.offsetX
      this.dragObj.initY = e.offsetY
      this.dragObj.width = this.$refs.layerManagerPanel.offsetWidth
      this.dragObj.height = this.$refs.layerManagerPanel.offsetHeight - this.$refs.header.offsetHeight
    },
    // 鼠标移动 --- 节流
    throttleMove (e) {
      return throttle(this.handleDragMouseMove(e), 500)
    },
    // 拖动过程中，需要实时监听位置变化
    handleDragMouseMove (e) {
      if (this.isMouseDown) {
        // 移动外层需要移动的div
        let _cx = e.clientX - this.dragObj.initX
        let _cy = e.clientY - this.dragObj.indexY
        // 限制panel不能超出浏览器边界
        _cx = _cx >= 0 ? _cx : 0
        _cy = _cy >= 0 ? _cy : 0
        if (window.innerWidth - e.clientX + this.dragObj.initX < this.dragObj.width + 16 || window.innerWidth - this.dragObj.width < _cx) {
          _cx = window.innerWidth - this.dragObj.width
        }
        if (e.clientY > window.innerHeight - this.dragObj.height - this.$refs.header.offsetHeight + this.dragObj.initY) {
          _cy = window.innerHeight - this.$refs.header.offsetHeight - this.dragObj.height
        }
        this.$refs.layerManagerPanel.style.left = _cx + 'px'
        this.$refs.layerManagerPanel.style.top = _cy + 'px'
      }
    },
    // 鼠标移除，取消监听
    handleDragMouseUp (e) {
      if (e.clientY > window.innerWidth || e.clientY < 0 || e.clientX < 0 || e.clientX > window.innerHeight) {
        this.isMouseDown = false
      }
      this.isMouseDown = false
    }
  }
}
</script>

<style lang="scss">
.the-comp-layer-manager-page {
  background-color: #fafafa;
  position: fixed;
  left: 0;
  top: 0;
  width: 160px;
  overflow: hidden;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.16);
  z-index: 1000;
  height: 286px;
  user-select: none;
  box-sizing: content-box;
  .header {
    background-color: #fff;
    height: 48px;
    line-height: 48px;
    width: 100%;
    padding: 0 16px;
    user-select: none;
    display: flex;
    &.pointer-events {
      pointer-events: none;
    }
    .title {
      flex: 0 0 50%;
      font-size: 13px;
      cursor: move;
    }
    .close {
      flex: 0 0 30%;
      text-align: right;
      z-index: 9999;
      span {
        cursor: pointer;
        font-size: 14px;
        color: #a3afb7;
      }
    }
  }
  .layer-panel-list {
    height: calc(#{"100% - 54px"});
    font-size: 13px;
    li {
      height: 40px;
      line-height: 40px;
      padding: 0 16px;
      box-sizing: content-box;
      border-top: 1px solid #e6ebed;
      &:hover {
        color: #ffffff;
        background-color: #1593ff;
      }
    }
    li:nth-child(1) {
      &:hover {
        color: #ffffff;
        background-color: #ff2a6a;
      }
    }
  }
}
</style>
