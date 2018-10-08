<!--region 组件设置-->
<template>
  <ul class="coll-item">
    <li class="props-item in-line">
      <label>阴影颜色</label>
      <el-color-picker v-model="currComp.css.bs.c" show-alpha color-format="rgb"
                       size="small" @change="updateBs"></el-color-picker>
      <ul class="color-panel">
        <template v-for="(color, key) in colorArr">
          <li :key="key" :style="{backgroundColor: color}"
              @click="chooseColorByPanel({bs: {c: color}})"></li>
        </template>
      </ul>
    </li>
    <li class="props-item in-line">
      <label>阴影大小</label>
      <el-slider class="line-height-slider"
                 v-model="currComp.css.bs.s"
                 :step="1"
                 :min="0"
                 :max="20"
                 :show-input-controls="false"
                 show-input
                 @change="updateBs"></el-slider>
    </li>
    <li class="props-item in-line">
      <label>水平偏移</label>
      <el-slider class="line-height-slider"
                 v-model="currComp.css.bs.h"
                 :step="1"
                 :min="-10"
                 :max="10"
                 :show-input-controls="false"
                 show-input
                 @change="updateBs"></el-slider>
    </li>
    <li class="props-item in-line">
      <label>垂直偏移</label>
      <el-slider class="line-height-slider"
                 v-model="currComp.css.bs.v"
                 :step="1"
                 :min="-10"
                 :max="10"
                 :show-input-controls="false"
                 show-input
                 @change="updateBs"></el-slider>
    </li>
    <li class="props-item in-line">
      <label>阴影模糊</label>
      <el-slider class="line-height-slider"
                 v-model="currComp.css.bs.b"
                 :step="1"
                 :min="-0"
                 :max="20"
                 :show-input-controls="false"
                 show-input
                 @change="updateBs"></el-slider>
    </li>
  </ul>
</template>
<!--endregion-->
<script>
export default {
  name: 'ShadowConfig',
  components: {},
  data () {
    return {
      colorArr: ['#FFFFFF', '#FF5448', '#F2A653', '#FFCA28', '#18CFA1', '#59C7F9', '#4D8FF3', '#7171EF', '#4F5975', '#000000']
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {
    // 取当前组件
    currComp () {
      return this.$store.getters.curComp
    }
  },
  methods: {
    handleColl (item) {},
    // 阴影
    updateBs () {
      this.syncCss('css', { 'bs': this.currComp.css['bs'] })
    },
    // 同步到持久化
    syncCss (type, val) {
      this.$store.dispatch('editComp', {
        type: type,
        value: val
      })
    }
  }
}
</script>

<style lang="scss">
@import "../../iTemplate/style/Config";
</style>
