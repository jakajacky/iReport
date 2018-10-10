<!--region 组件设置-->
<template>
  <div class="text-comp-config-page">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="样式" name="1">
        <el-collapse class="props-style-coll-list" v-model="activeColl" accordion @change="handleColl">
          <template v-for="(coll, key) in collList">
            <el-collapse-item :title="coll.value" :name="coll.key" :key="key">
              <!--region 基础属性设置-->
              <ul v-if="coll.key === '1'" class="coll-item">
                <li class="props-item">
                  <div class="props-images-item">
                    <div class="image-box" :style="{backgroundImage: 'url(' +currComp.props.url+ ')'}">
                    </div>
                    <div class="image-btn">
                      <el-button @click="openDialogImg">更换图片<i class="el-icon-upload el-icon--right"></i>
                      </el-button>
                    </div>
                  </div>
                </li>
              </ul>
              <!--endregion-->
              <!--region 边框属性-->
              <border-config v-if="coll.key === '2'"></border-config>
              <!--endregion-->
              <!--region 阴影属性-->
              <shadow-config v-if="coll.key === '3'"></shadow-config>
              <!--endregion-->
              <!--region 尺寸和位置-->
              <size-and-position-config v-if="coll.key === '4'"></size-and-position-config>
              <!--endregion-->
            </el-collapse-item>
          </template>
          <!--图片弹出框组件-->
          <i-dialog-img  ref="iDialogImgOpen"></i-dialog-img>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="动画" name="2">动画</el-tab-pane>
    </el-tabs>
  </div>
</template>
<!--endregion-->
<script>
import iDialogImg from '../../iDialogImg/Index'
import SizeAndPositionConfig from '../../iConfig/SizeAndPosition/Config'
import ShadowConfig from '../../iConfig/Shadow/Config'
import BorderConfig from '../../iConfig/Border/Config'

export default {
  name: 'ImageConfig',
  components: {
    iDialogImg,
    SizeAndPositionConfig,
    ShadowConfig,
    BorderConfig
  },
  data () {
    return {
      activeTab: '1',
      activeColl: '1', // 当前样式设置分类
      collList: [
        {
          key: '1',
          value: '图片'
        },
        {
          key: '2',
          value: '边框'
        },
        {
          key: '3',
          value: '阴影'
        },
        {
          key: '4',
          value: '尺寸和位置'
        }
      ],
      colorArr: ['#FFFFFF', '#FF5448', '#F2A653', '#FFCA28', '#18CFA1', '#59C7F9', '#4D8FF3', '#7171EF', '#4F5975', '#000000'], // 颜色快捷面板
      openDialog: false // 图片弹出框
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
    // 通过快捷面板 === 选择颜色
    chooseColorByPanel (val) {
      this.syncCss('css', val)
    },
    // 文本框内容更新
    updateProps () {
      this.syncCss('props', { 'url': this.currComp.props['url'] })
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
    },
    // 打开DialogImg
    openDialogImg () {
      this.openDialog = true
      console.log(this.$refs.iDialogImgOpen)
      this.$refs.iDialogImgOpen.showDialog('背景')
    }
  }
}
</script>

<style lang="scss">
@import "../style/Config";
</style>
