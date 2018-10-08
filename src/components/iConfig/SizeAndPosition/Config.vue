<!--region 组件设置-->
<template>
  <!--region 尺寸和位置-->
  <ul class="coll-item">
    <li class="props-item in-line more-height">
      <label>尺寸(px)</label>
      <div class="size-group">
        <div class="width item">
          <el-input size="medium" type="number" v-model="currComp.css.h"
                    @change="updateSizeAndLocation('h')"></el-input>
          <p>高度</p>
        </div>
        <div class="height item">
          <el-input size="medium" type="number" v-model="currComp.css.w"
                    @change="updateSizeAndLocation('w')"></el-input>
          <p>宽度</p>
        </div>
      </div>
    </li>
    <li class="props-item in-line more-height">
      <label>位置(px)</label>
      <div class="size-group">
        <div class="width item">
          <el-input size="medium" type="number" v-model="currComp.css.l"
                    @change="updateSizeAndLocation('l')"></el-input>
          <p>X</p>
        </div>
        <div class="height item">
          <el-input size="medium" type="number" v-model="currComp.css.t"
                    @change="updateSizeAndLocation('t')"></el-input>
          <p>Y</p>
        </div>
      </div>
    </li>
    <li class="props-item in-line">
      <label>旋转</label>
      <el-slider class="line-height-slider"
                 v-model="currComp.css.rotate"
                 :step="1"
                 :min="-360"
                 :max="360"
                 :show-input-controls="false"
                 show-input
                 @change="updateSizeAndLocation('rotate')"></el-slider>
    </li>
  </ul>
  <!--endregion-->
</template>
<!--endregion-->
<script>
export default {
  name: 'SizeAndPositionConfig',
  data () {
    return {
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
    // 更新尺寸和位置
    updateSizeAndLocation (key) {
      let _flag = ''
      switch (key) {
        case 'h':
          _flag = 'height'
          break
        case 'w':
          _flag = 'width'
          break
        case 'l':
          _flag = 'left'
          break
        case 't':
          _flag = 'top'
          break
        case 'rotate':
          _flag = 'transform'
          break
      }
      let _obj = {}
      _obj[key] = this.currComp.css[key]
      this.syncCss('css', _obj)
      // this.$parent.$parent.$parent.$refs['editorContainer'].$refs[`comp_${this.currComp.id}`][0].style[_flag] = key !== 'rotate' ? this.currComp.css[key] + 'px' : `rotate(${this.currComp.css[key]}deg)`
      document.getElementById(`comp_${this.currComp.id}`).style[_flag] = key !== 'rotate' ? this.currComp.css[key] + 'px' : `rotate(${this.currComp.css[key]}deg)`
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
