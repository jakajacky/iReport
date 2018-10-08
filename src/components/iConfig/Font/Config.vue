<!--region 组件设置-->
<template>
  <ul class="coll-item">
    <li class="props-item in-line">
      <label>字体</label>
      <el-select v-model="currComp.css.ft.t" size="small" @change="updateFont">
        <el-option v-for="size in fontFamilyArr"
                   :key="size.id"
                   :label="size.value"
                   :value="size.id"></el-option>
      </el-select>
    </li>
    <li class="props-item in-line">
      <label>颜色</label>
      <el-color-picker v-model="currComp.css.ft.c" show-alpha color-format="rgb"
                       size="small" @change="updateFont"></el-color-picker>
      <ul class="color-panel">
        <template v-for="(color, key) in colorArr">
          <li :key="key" :style="{backgroundColor: color}"
              @click="chooseColorByPanel({ft: {c: color}})"></li>
        </template>
      </ul>
    </li>
    <li class="props-item in-line">
      <label>背景色</label>
      <el-color-picker v-model="currComp.css.bgc" show-alpha color-format="rgb"
                       size="small" @change="updateBg"></el-color-picker>
      <ul class="color-panel">
        <template v-for="(color, key) in colorArr">
          <li :key="key" :style="{backgroundColor: color}" @click="chooseColorByPanel({ bgc: color})"></li>
        </template>
      </ul>
    </li>
    <li class="props-item in-line">
      <label>行高</label>
      <el-slider class="line-height-slider"
                 v-model="currComp.css.ft.lh"
                 :step=".1"
                 :min="0"
                 :max="10"
                 :show-input-controls="false"
                 show-input
                 @change="updateFont"></el-slider>
    </li>
    <li class="props-item in-line">
      <label>字距</label>
      <el-slider class="line-height-slider"
                 v-model="currComp.css.ft.ls"
                 :step="1"
                 :min="0"
                 :max="20"
                 :show-input-controls="false"
                 show-input
                 @change="updateFont"></el-slider>
    </li>
    <li class="props-item in-line">
      <label>字号</label>
      <el-select v-model="currComp.css.ft.s" size="small" @change="updateFont">
        <el-option v-for="size in fontSizeArr"
                   :key="size.id"
                   :label="size.value"
                   :value="size.id"></el-option>
      </el-select>
    </li>
    <li class="props-item in-line">
      <label>对齐方式</label>
      <el-select class="text-align-select" v-model="currComp.css.ta" size="small" @change="updateFont">
        <el-option v-for="align in textAlignArr"
                   :key="align.id"
                   :label="align.desc"
                   :value="align.id">
          <span class="axon-icon" style="font-size: 16px;" v-html="align.icon"></span>
          <span>{{ align.desc }}</span>
        </el-option>
      </el-select>
    </li>
    <li class="props-item in-line">
      <label>字体加粗</label>
      <el-slider class="weight-slider"
                 v-model="currComp.css.ft.fw"
                 :step="1"
                 :min="1"
                 :max="6"
                 show-stops @change="updateFont"></el-slider>
    </li>
    <li class="props-item font-icon-props">
                  <span :class="currComp.css.ft.fs ? 'axon-icon is-active' : 'axon-icon'"
                        v-html="'&#xe659;'" @click="clickUpdateFont('fs')"
                  ></span>
      <span :class="currComp.css.ft.td ? 'axon-icon is-active' : 'axon-icon'"
            v-html="'&#xe65c;'" @click="clickUpdateFont('td')"></span>
    </li>
  </ul>
</template>
<!--endregion-->
<script>
import {
  FONT_FAMILYS,
  FONT_SIZES,
  TEXT_ALIGN
} from '../../../filters/modules/styleMatch.js'

export default {
  name: 'FontConfig',
  components: {},
  data () {
    return {
      colorArr: ['#FFFFFF', '#FF5448', '#F2A653', '#FFCA28', '#18CFA1', '#59C7F9', '#4D8FF3', '#7171EF', '#4F5975', '#000000'] // 颜色快捷面板
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
    // 字体转数组
    fontFamilyArr () {
      let _arr = []
      for (let i in FONT_FAMILYS) {
        _arr.push({ id: parseInt(i), value: FONT_FAMILYS[i] })
      }
      return _arr
    },
    // 字号转数组
    fontSizeArr () {
      let _arr = []
      for (let i in FONT_SIZES) {
        _arr.push({ id: parseInt(i), value: FONT_SIZES[i] })
      }
      return _arr
    },
    // 对齐方式转数组
    textAlignArr () {
      let _arr = []
      for (let i in TEXT_ALIGN) {
        let _icon = TEXT_ALIGN[i] === 'left' ? '&#xe629;' : TEXT_ALIGN[i] === 'center' ? '&#xe661;' : '&#xe60f;'
        let _desc = TEXT_ALIGN[i] === 'left' ? '局左' : TEXT_ALIGN[i] === 'center' ? '居中' : '居右'
        _arr.push({
          id: parseInt(i),
          value: TEXT_ALIGN[i],
          icon: _icon,
          desc: _desc
        })
      }
      return _arr
    }
  },
  methods: {
    handleColl (item) {},
    // 通过快捷面板 === 选择颜色
    chooseColorByPanel (val) {
      this.syncCss('css', val)
    },
    // 文本框内容更新
    updateProps () {
      this.syncCss('props', { 'text': this.currComp.props['text'] })
    },
    // 倾斜、下划线点击样式更新
    clickUpdateFont (key) {
      this.currComp.css.ft[key] = !this.currComp.css.ft[key]
      this.updateFont()
    },
    // 样式更新 === 字体
    updateFont () {
      this.syncCss('css', { 'ft': this.currComp.css['ft'] })
    },
    // 样式更新 === 背景
    updateBg () {
      this.syncCss('css', { 'bgc': this.currComp.css['bgc'] })
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
