<!--region 组件设置-->
<template>
  <ul class="coll-item">
    <li class="props-item in-line">
      <label>边框样式</label>
      <el-select v-model="currComp.css.bd.t" size="small" @change="updateBd">
        <el-option v-for="size in borderTypeArr"
                   :key="size.id"
                   :label="size.desc"
                   :value="size.id"></el-option>
      </el-select>
    </li>
    <li class="props-item in-line">
      <label>边框颜色</label>
      <el-color-picker v-model="currComp.css.bd.c" show-alpha color-format="rgb"
                       size="small" @change="updateBd"></el-color-picker>
      <ul class="color-panel">
        <template v-for="(color, key) in colorArr">
          <li :key="key" :style="{backgroundColor: color}"
              @click="chooseColorByPanel( {bd: {c: color}})"></li>
        </template>
      </ul>
    </li>
    <li class="props-item in-line">
      <label>边框尺寸</label>
      <el-slider class="line-height-slider"
                 v-model="currComp.css.bd.w"
                 :step="1"
                 :min="0"
                 :max="20"
                 :show-input-controls="false"
                 show-input
                 @change="updateBd"></el-slider>
    </li>
    <li class="props-item in-line">
      <label>边框弧度</label>
      <el-slider class="line-height-slider"
                 v-model="currComp.css.br"
                 :step="1"
                 :min="0"
                 :max="100"
                 :show-input-controls="false"
                 show-input @change="updateBd"></el-slider>
    </li>
  </ul>
</template>
<!--endregion-->
<script>
import {
  BORDER_STYLES
} from '../../../filters/modules/styleMatch.js'

export default {
  name: 'ImageConfig',
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
    },
    // 边框类型
    borderTypeArr () {
      let _arr = []
      for (let i in BORDER_STYLES) {
        let _t = ''
        switch (BORDER_STYLES[i]) {
          case 'none' :
            _t = '无'
            break
          case 'solid':
            _t = '实线'
            break
          case 'dashed':
            _t = '虚线'
            break
          case 'dotted':
            _t = '点状线'
            break
          case 'double':
            _t = '双线'
            break
        }
        _arr.push({ id: parseInt(i), value: BORDER_STYLES[i], desc: _t })
      }
      return _arr
    }
  },
  methods: {
    handleColl (item) {},
    // 边框
    updateBd () {
      this.syncCss('css', { 'bd': this.currComp.css['bd'] })
    },
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
