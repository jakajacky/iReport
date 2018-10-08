/**
 * 文本框组件 配置参数
 */
export default () => {
  return {
    id: 1,
    title: '图表',
    name: 'EChars',
    type: 1, // 基本信息
    animation: {
      type: 1,
      duration: 1,
      delay: 0.4
    }, // 动画
    props: {
      componentId: '', // vue组件ID
      sourceRemark: '', // 口径说明
      tempHtml: '', // 组件代码片
      dataObj: '' // 数据样例
    }, // 文本
    css: {
      t: 140, // 顶部距离
      l: 20, // 左侧距离
      w: 800, // 宽度
      h: 450, // 高度
      bd: {
        w: 0,
        t: 0,
        c: ''
      }, // 边框属性
      br: 5, // 边框圆角
      rotate: 0, // 旋转角度
      bgc: '', // 背景色
      bs: {
        h: 0,
        v: 0,
        b: 0,
        s: 0,
        c: '#ccc'
      } // 偏移
    } // css样式
  }
}
