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
      this.charts = echarts.init(document.getElementById(id))
      this.charts.setOption({
        xAxis: {
          data: this.xAxis,
          axisLabel: {
            rotate: 40
          }
        },
        yAxis: {
          name: '(' + this.unitData + ')',
          axisLabel: {
            textStyle: {}
          },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '0%',
          containLabel: true
        },
        series: [
          { // For shadow
            type: 'bar',
            itemStyle: {
              normal: { color: 'rgba(0,0,0,0.1)', barBorderRadius: [15, 15, 0, 0] }
            },
            barGap: '-100%',
            barCategoryGap: '50%',
            // data: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60],
            animation: false
          },
          {
            type: 'bar',
            barMaxWidth: '50px',
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList = [
                    '#e83828', '#31b4a7', '#f8b62d', '#c79f62',
                    '#c79f62', '#c79f62', '#c79f62', '#c79f62',
                    '#c79f62', '#c79f62', '#c79f62', '#c79f62', '#c79f62', '#c79f62'
                  ]
                  return colorList[params.dataIndex]
                },
                barBorderRadius: [30, 30, 0, 0]
              }
            },
            data: this.yAxisData,
            label: {
              normal: {
                // show: true,
                position: 'top',
                color: '#000'
              }
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
<style>
@import '../../assets/style/EditorNewYear.css';
</style>
