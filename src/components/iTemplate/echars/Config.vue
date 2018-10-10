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
                <li class="props-item in-line">
                  <label>EChars</label>
                  <el-select v-model="componentId" size="small" @change="updateProps">
                    <template v-for="item in componentList">
                      <el-option :label="item.componentName" :value="item.componentId"
                                 :key="item.componentId"></el-option>
                    </template>
                  </el-select>
                </li>
                <li class="props-item">
                  <label>样例数据</label>
                  <el-input type="textarea" v-model="currComp.props.sourceRemark"
                            placeholder="样例数据"
                            size="small"
                            @change="updateProps"></el-input>
                </li>
              </ul>
              <!--endregion-->
              <!--region 尺寸和位置-->
              <size-and-position-config v-if="coll.key === '2'"></size-and-position-config>
              <!--endregion-->
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
import ReportComponent from '../../../components/EChars/reportComponent'

export default {
  name: 'TextConfig',
  components: {
    SizeAndPositionConfig
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
          value: '尺寸和位置'
        }
      ],
      componentId: '',
      componentList: ReportComponent.reportComponentList // EChars组件列表
    }
  },
  computed: {
    // 取当前组件
    currComp () {
      return this.$store.getters.curComp
    }
  },
  created () {
  },
  mounted () {
    this.getComponentId()
  },
  methods: {
    handleColl (item) {},
    getComponentId () {
      this.componentId = this.currComp.props.componentId
    },
    // EChars组件内容更新，涉及到动态组件挂载问题，需要先删除后新增
    updateProps () {
      // 获取当前EChars组件
      if (this.currComp.props.name === 'EChars') {
        let compId = this.currComp.id
        // 删除当前组件
        this.$store.dispatch('removeComp', compId)
        // 将组件从当前页面中移除
        this.$store.dispatch('removeComponentToPage', compId)
      }
      // 所有组件的配置参数
      var componentList = ReportComponent.reportComponentList
      // 根据componentId 获取配置信息
      var params = componentList.find(item => item.componentId === this.componentId)
      params.name = 'EChars'
      this.$store.dispatch('addNewCompByParams', params)
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
