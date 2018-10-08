/**
 * Created by tangyn
 * Created on 2018/02/06
 */

export default {
  /**
   * 批量处理单位
   * @returns {Promise}
   */
  fomateUnit (unit, yAxis) {
    var param = {
      unit: '',
      yAxis: []
    }
    var yList = []
    var index = -1
    try {
      index = unit.indexOf('万人')
    } catch (e) {}
    var indexH = -1
    try {
      indexH = unit.indexOf('小时')
    } catch (e) {}
    if (index > -1 && this.maxArray(yAxis) > 10000) {
      for (var i = 0; i < yAxis.length; i++) {
        yList.push((yAxis[i] / 10000.0).toFixed(2))
      }
      param.yAxis = yList
      param.unit = unit
    } else if (indexH > -1 && this.maxArray(yAxis) > 24) {
      for (var h = 0; h < yAxis.length; h++) {
        yList.push((yAxis[h] / 24).toFixed(2))
      }
      param.yAxis = yList
      param.unit = '天'
    } else {
      if (this.maxArray(yAxis) > 10000) {
        for (var p = 0; p < yAxis.length; p++) {
          yList.push((yAxis[p] / 10000.0).toFixed(2))
        }
        param.yAxis = yList
        param.unit = unit.replace('人', '万人')
      } else {
        param.yAxis = yAxis
        param.unit = unit.replace('万', '')
      }
    }
    return param
  },
  /**
   * 求数据中的最大值
   * @returns {Promise}
   */
  maxArray (arr) {
    let max = parseFloat(arr[0])
    for (let i = 0; i < arr.length - 1; i++) {
      if (max < parseFloat(arr[i + 1])) {
        max = parseFloat(arr[i + 1])
      }
      // max = arr[i] < arr[i + 1] ? arr[i + 1] : arr[i]
    }
    return max
  },
  /**
   * 求数据中的最小值
   * @returns {Promise}
   */
  minArray (arr) {
    let min = arr[0]
    for (let i = 0; i < arr.length - 1; i++) {
      if (min > arr[i + 1]) {
        min = arr[i + 1]
      }
    }
    return min
  },
  /**
   * 求平均值
   * @returns {Promise}
   */
  avgArray (arr) {
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
      sum += parseFloat(arr[i])
    }
    return (sum / arr.length).toFixed(2)
  },
  /**
   * 排序
   * @returns {Promise}
   */
  sortAxis (xAxis, yAxis) {
    var xList = []
    var yList = []
    if (parseFloat(yAxis[yAxis.length - 1]) < parseFloat(yAxis[0])) {
      for (var i = yAxis.length - 1; i >= 0; i--) {
        yList.push(yAxis[i])
        xList.push(xAxis[i])
      }
      return {xAxis: xList, yAxis: yList}
    } else {
      return {xAxis: xAxis, yAxis: yAxis}
    }
  }
}
