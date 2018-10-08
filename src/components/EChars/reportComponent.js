export default {
  // 园区客流检测 数据
  reportComponentList: [
    {
      componentId: 87001,
      componentName: '柱状图',
      sourceRemark: '项王故里为节日期间游客量最多的，三台山森林公园和洪泽湖湿地公园分列二三名。',
      tempHtml: '<i-LBarFour :chartsId="dataObj.chartsId" :title="dataObj.title" :xAxis="dataObj.xAxis" :yAxis="dataObj.yAxis" :unit="dataObj.unit"></i-LBarFour >',
      dataObj: {
        chartsId: `circularCharsID`,
        title: '接待省外访客量TOP10景区排名',
        xAxis: ['项王故里', '三台山森林公园', '洪泽湖湿地公园', '湖滨公园', '洋河酒厂', '雪枫公园', '龙王庙行宫', '中国杨树博物馆'],
        yAxis: [38056, 33824, 22672, 18616, 13112, 7016, 6864, 5792],
        unit: '人次'
      }
    },
    {
      componentId: 87002,
      componentName: '折线图',
      sourceRemark: '中秋期间，9月23日接待访客量最多，9月24日接待访客量最少',
      tempHtml: '<i-Line :chartsId="dataObj.chartsId" :title="dataObj.title" :xAxis="dataObj.xAxis" :yAxis="dataObj.yAxis" :unit="dataObj.unit"></i-Line >',
      dataObj: {
        chartsId: `lineCharsID`,
        title: '分日客流量变化',
        xAxis: ['9月22日', '9月23日', '9月23日'],
        yAxis: [59.28, 63.86, 33.86],
        unit: '万人'
      }
    },
    {
      componentId: 87003,
      componentName: '饼状图',
      sourceRemark: '节假日期间，年龄在22岁及以下、23-35岁和36-45岁的访客占访客总量的60%',
      tempHtml: '<i-HollowPie :chartsId="dataObj.chartsId" :title="dataObj.title" :xAxis="dataObj.xAxis" :yAxis="dataObj.yAxis" :unit="dataObj.unit"></i-HollowPie>',
      dataObj: {
        chartsId: `hollowPieCharsID`,
        title: '访客年龄段分布',
        xAxis: ['22岁及以下', '23-35岁', '36-45岁', '46-55岁', '56岁及以上'],
        yAxis: [25145, 108532, 83761, 91837, 53111],
        unit: '%'
      }
    }
  ]
}
