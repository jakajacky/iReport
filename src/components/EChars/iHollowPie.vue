<template>
  <div :id="chartsId" style="height: 26rem;width: 100%;"></div>
</template>
<script>
import echarts from 'echarts'
//  var colorList = ['#88d20a', '#ffd202', '#04bcb7', '#768fff', '#e8546b']
var colorList = ['#ef540b', '#dbdedd', '#898acb', '#f9b52e', '#31b3a7']
export default {
  props: {
    chartsId: '',
    title: '',
    allowEdit: {
      type: Boolean,
      default: null
    },
    xAxis: {
      type: Array,
      default: null
    },
    yAxis: {
      type: Array,
      default: null
    },
    unit: ''
  },
  data () {
    return {
      yAxisData: []
    }
  },
  watch: {
    'xAxis': {
      handler (val, oldVal) {
        this.formatValue()
        this.drawPie(this.chartsId)
      }
    },
    'yAxis': {
      handler (val, oldVal) {
        this.formatValue()
        this.drawPie(this.chartsId)
      }
    }
  },
  methods: {
    formatValue () {
      for (var i = 0; i < this.yAxis.length; i++) {
        this.yAxisData.push({ name: this.xAxis[i], value: this.yAxis[i] })
      }
    },
    drawPie (id) {
      this.charts = echarts.init(document.getElementById(id))
      this.charts.setOption({
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: true,
            label: {
              normal: {
                fontSize: 16,
                color: '#000'
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: this.yAxisData,
            itemStyle: {
              normal: {
                color: function (e) {
                  var index = e.dataIndex
                  return colorList[index]
                },
                label: {
                  formatter: '{b} : {d}%'
                  // formatter: '{a} : {c} ({d}%)'
                }
              }
            }
          }
        ]
      })
    }
  },
  mounted () {
    this.formatValue()
    this.drawPie(this.chartsId)
  }
}
</script>
<style>
.preview .person {
  top: 19rem;
  left: 27rem;
}

.person {
  position: absolute;
  width: 9rem;
  height: 9rem;
  top: 14.7rem;
  left: 20.7rem;
  background-image: url("http://www.v-data.com.cn/assets/images/person.png");
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
