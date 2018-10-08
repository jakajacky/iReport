import Vue from 'vue'
import iLBarFour from '../components/EChars/iLBarFour.vue'
import iLine from '../components/EChars/iLine.vue'
import iHollowPie from '../components/EChars/iHollowPie.vue'
export function ProfileFun (params) {
  // 创建构造器
  var profile = Vue.extend({
    template: params.tempHtml,
    components: {
      iLBarFour,
      iLine,
      iHollowPie
    },
    data: function () {
      return {
        dataObj: {},
        allowEdit: null
      }
    },
    created () {
      this.dataObj = params.dataObj
      this.allowEdit = params.allowEdit
    }
  })
  // 创建 Profile 实例，并挂载到一个元素上。
  return profile
}
