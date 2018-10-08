<!--region VUE图表框组件-->
<template>
  <div class="e-chars">
    <div :id="`mount-${this.id}`"></div>
  </div>
</template>
<!--endregion-->
<script>
import { ProfileFun } from '../../../services/porfile'

export default {
  name: 'BaseEChars',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  created () {
  },
  mounted () {
    // 创建 Profile 实例，并挂载到一个元素上。
    this.initProfile()
  },
  computed: {
    // 取对应ID的组件
    compObj () {
      return this.$store.getters.getCompConfigByCompId(this.id)
    }
  },
  methods: {
    // 创建 Profile 实例，并挂载到一个元素上。
    initProfile () {
      // tempHtml、dataObj 根据 compObj.props 中动态获取
      var tempHtml = ''
      var dataObj = {}
      if (this.compObj.props) {
        tempHtml = this.compObj.props.tempHtml
        dataObj = this.compObj.props.dataObj
        dataObj.chartsId = `${dataObj.chartsId}-${this.id}`
      } else {
        tempHtml = '<i-LBarFour :chartsId="dataObj.chartsId" :title="dataObj.title" :xAxis="dataObj.xAxis" :yAxis="dataObj.yAxis" :unit="dataObj.unit"></i-LBarFour >'
        dataObj = {
          chartsId: `circularCharsID-${this.id}`,
          title: '接待省外访客量TOP10景区排名',
          xAxis: ['项王故里', '三台山森林公园', '洪泽湖湿地公园', '湖滨公园', '洋河酒厂', '雪枫公园', '龙王庙行宫', '中国杨树博物馆'],
          yAxis: [38056, 33824, 22672, 18616, 13112, 7016, 6864, 5792],
          unit: '人次'
        }
      }
      var Profile = ProfileFun({
        tempHtml: tempHtml,
        dataObj: dataObj,
        allowEdit: false
      })
      new Profile().$mount(`#mount-${this.id}`)
    }
  }
}
</script>
