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
                  <label>内容</label>
                  <el-input v-model="currComp.props.text"
                            placeholder="请输入内容"
                            size="small"
                            @change="updateProps"></el-input>
                </li>
              </ul>
              <font-config v-if="coll.key === '1'"></font-config>
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
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="动画" name="2">动画</el-tab-pane>
    </el-tabs>
  </div>
</template>
<!--endregion-->
<script>
import SizeAndPositionConfig from '../../iConfig/SizeAndPosition/Config'
import ShadowConfig from '../../iConfig/Shadow/Config'
import BorderConfig from '../../iConfig/Border/Config'
import FontConfig from '../../iConfig/Font/Config'

export default {
  name: 'TextConfig',
  components: {
    SizeAndPositionConfig,
    ShadowConfig,
    BorderConfig,
    FontConfig
  },
  data () {
    return {
      activeTab: '1',
      activeColl: '1', // 当前样式设置分类
      collList: [
        {
          key: '1',
          value: '基础'
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
      ]
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
      this.syncCss('props', { 'text': this.currComp.props['text'] })
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
@import "../style/Config";
</style>
