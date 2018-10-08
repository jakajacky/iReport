<template>
  <div :id="chartsId" style="width:100%;height: 28rem;"></div>
</template>
<script>
import echarts from 'echarts'
import UnixBll from '../../services/UnixBll'

export default {
  props: {
    chartsId: '',
    allowEdit: {
      type: Boolean,
      default: null
    },
    title: '',
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
  watch: {
    'xAxis': {
      handler (val, oldVal) {
        this.drawPie(this.chartsId)
      }
    },
    'yAxis': {
      handler (val, oldVal) {
        this.drawPie(this.chartsId)
      }
    }
  },
  methods: {
    drawPie (id) {
      this.charts = echarts.init(document.getElementById(this.chartsId))
      this.charts.setOption({
        legend: {
          data: [this.title]
        },
        grid: {
          left: '5%',
          right: '5%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.xAxis
        },
        yAxis: {
          name: '(' + this.unitData + ')',
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        series: [
          {
            type: 'line',
            data: this.yAxisData,
            smooth: true,
            lineStyle: {
              normal: {
                color: 'orange'
              }
            },
            areaStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: '#fad994' // 0% 处的颜色
                  }, {
                    offset: 1, color: '#fff' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
              }
            },
            markPoint: {
              symbol: 'roundRect',
              symbolOffset: [35, -20],
              symbolSize: [60, 20],
              label: {
                normal: {
                  color: '#fff'
                }
              },
              data: [
                {
                  name: '最小值', type: 'min'
                },
                {
                  name: '最大值', type: 'max'
                }
              ]
            }
          }
        ]
      })
    }
  },
  computed: {
    yAxisData () {
      return UnixBll.fomateUnit(this.unit, this.yAxis).yAxis
    },
    unitData () {
      return UnixBll.fomateUnit(this.unit, this.yAxis).unit
    }
  },
  mounted () {
    this.drawPie(this.chartsId)
  }
}
</script>
