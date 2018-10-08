/**
 * 图片组件 配置参数
 */
export default () => {
  return {
    id: 1,
    title: '图片',
    name: 'Image',
    type: 1, // 基本信息
    animation: {
      type: 1,
      duration: 1,
      delay: 0.4
    }, // 动画
    props: {
      url: 'http://res.eqh5.com/store/6FA0B7940F1C51B07AFDA6F4CCFA0B2E.png'
    }, // URL
    css: {
      t: 100, // 顶部距离
      l: 100, // 左侧距离
      w: 168, // 宽度
      h: 60, // 高度
      bd: {
        w: 0,
        t: 1,
        c: 'transparent'
      }, // 边框属性
      ta: 2, // 对齐属性
      br: 5, // 边框圆角
      rotate: 0, // 旋转角度
      bgc: 'transparent', // 背景色
      bs: {
        h: 0,
        v: 0,
        b: 0,
        s: 0,
        c: '#ccc'
      } // 阴影颜色
    } // css样式
  }
}
