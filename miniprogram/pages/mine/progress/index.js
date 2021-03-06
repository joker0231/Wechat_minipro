// pages/mine/progress/index.js
import * as echarts from '../../../libs/ec-canvas/echarts';

let chart = null;

var option_radar = {  //指定图表的配置项和数据
  // backgroundColor: 'rgba(204,204,204,0.7)',  //配置背景色，默认无背景
  title: {  //配置标题组件
    text: '掌握雷达图(点击详情)',
    target: 'blank', top: '2%', left: '28%', textStyle: { color: 'rgb(252,211,158)', fontSize: 18, }
  },
  legend: {  //配置图例组件
    show: true,  //设置是否显示图例
    icon: 'rect',  //icon.'circle'|'rect'|'roundRect'|'triangle'|'diamond'|'pin'|'arrow'|'none'
    top: '10%',  //设置图例距离顶部边距
    left: '60%',  //设置图例距离左侧边距
    itemWidth: 10,  //设置图例标记的图形宽度
    itemHeight: 10,  //设置图例标记的图形高度
    itemGap: 30,  //设置图例每项之间的间隔
    orient: 'horizontal',  //设置图例列表的布局朝向，'horizontal'|'vertical'
    textStyle: { fontSize: 15, color: '#fff' }, //设置图例的公用文本样式
    data: [  //设置图例的数据数组，数组项通常为字符串，每项代表一个系列name
      {
        name: '视频', icon: 'rect',
        textStyle: { color: 'rgba(51,0,255,1)', fontWeight: 'bold' }
      },  //设置图例项的文本样式
      {
        name: '练习', icon: 'rect',
        textStyle: { color: 'rgba(255,0,0,1)', fontWeight: 'bold' }
      }  //'normal'|'bold'|'bolder'|'lighter'
    ],
  },
  tooltip: {  //配置详情提示框组件
    //设置雷达图的tooltip不会超出div，也可设置position属性
    //设置定位不会随着鼠标移动而变化
    confine: true,  //设置是否将tooltip框限制在图表的区域内
    enterable: true,  //设置鼠标是否可以移动到tooltip区域内
  },
  radar: [{  //配置雷达图坐标系组件，只适用于雷达图
    center: ['50%', '56%'],  //设置中心坐标，数组的第1项是横坐标，第2项是纵坐标
    radius: 120,  //设置圆的半径，数组的第一项是内半径，第二项是外半径
    startAngle: 90,  //设置坐标系起始角度，也就是第一个指示器轴的角度
    name: {  //设置（圆外的标签）雷达图每个指示器名称
      formatter: '{value}',
      textStyle: { fontSize: 15, color: '#000' }
    },
    nameGap: 2,  //设置指示器名称和指示器轴的距离，默认为15
    splitNumber: 2,  //设置指示器轴的分割段数，default
    //shape:'circle',  //设置雷达图绘制类型，支持'polygon','circle'
    //设置坐标轴轴线设置
    axisLine: { lineStyle: { color: '#fff', width: 1, type: 'solid', } },
    //设置坐标轴在grid区域中的分隔线
    splitLine: { lineStyle: { color: '#fff', width: 1, } },
    splitArea: {
      show: true,
      areaStyle: { color: ['#abc', '#abc', '#abc', '#abc'] }
    },  //设置分隔区域的样式
    indicator: [  //配置雷达图指示器，指定雷达图中的多个变量，跟data中value对应
      { name: '语文', max: 20 }, { name: '数学', max: 20 },
      { name: '外语', max: 20 }, { name: '物理', max: 20 },
      //设置指示器的名称，最大值，标签的颜色
      { name: '化学', max: 20 }]
  }],
  series: [{
    name: '雷达图',  //系列名称，用于tooltip的显示，图例筛选
    type: 'radar',  //系列类型: 雷达图
    //拐点样式，'circle'|'rect'|'roundRect'|'triangle'|'diamond'|'pin'|'arrow'|'none'
    symbol: 'triangle',
    itemStyle: {  //设置折线拐点标志的样式
      normal: { lineStyle: { width: 1 }, opacity: 0.2 },  //设置普通状态时的样式
      emphasis: { lineStyle: { width: 5 }, opacity: 1 }  //设置高亮时的样式
    },
    data: [  //设置雷达图的数据是多变量(维度)
      {   //设置第1个数据项
        name: '练习',  //数据项名称
        value: [5, 6, 8, 9, 10],  //value是具体数据
        symbol: 'triangle',
        symbolSize: 5,  //设置单个数据标记的大小
        //设置拐点标志样式
        itemStyle: { normal: { borderColor: 'blue', borderWidth: 3 } },
        //设置单项线条样式
        lineStyle: { normal: { color: 'red', width: 1, opacity: 0.9 } },
        //areaStyle: {normal:{color:'red'}}  //设置单项区域填充样式
      },
      {   //设置第2个数据项
        name: '视频', value: [10, 6, 15, 11, 10],
        symbol: 'circle',
        symbolSize: 5,  //设置单个数据标记的大小
        itemStyle: { normal: { borderColor: 'rgba(51,0,255,1)', borderWidth: 3, } },
        lineStyle: { normal: { color: 'blue', width: 1, opacity: 0.9 } },
        //areaStyle:{normal:{color:'blue'}}  //设置单项区域填充样式
      }
    ]
  },]
};
var option_bar = {
  title: {  //配置标题组件
    text: '4月签到打卡图',
    target: 'blank', top: '2%', left: '33%', textStyle: { color: 'blue', fontSize: 18, }
  },
  xAxis: {
    data: ['第一周', '第二周', '第三周', '第四周'],
    name: '周'
  },
  yAxis: {
    max: 7,
    name: '天'
  },
  series: [{
      data: [{value: 1}, {value: 2}, {value: 3}, {value: 7, itemStyle: {color: 'rgb(252,211,158)'}}],
      type: 'bar',
      name: '签到天数',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(220, 220, 220, 0.8)',
      },
      label: {
        show: true,
        position: 'top',
        formatter: '{c}天'
      }
  }]
};
var option_pie = {
  // backgroundColor: 'lightgray',  //配置背景色，默认无背景
  title: {  //配置标题组件
    text: '累计饼图',
    target: 'blank', top: '10%', left: '38%', textStyle: { color: 'rgb(252,211,158)', fontSize: 18, }
  },
  series: [{
    type: "pie",
    radius: '55%',
    data: [{
      value: 335,
      name: "发帖数"
    }, {
      value: 310,
      name: "回帖数"
    }, {
      value: 234,
      name: "视频数"
    }, {
      value: 135,
      name: "练习题数"
    }
    ],
    selectedMode: true,
    label: {
      formatter: '{b}:\n {c}'

    }
  }]
}
var option_donut = {
  title: {  //配置标题组件
    text: '做题正确率',
    target: 'blank', top: '8%', left: '39%', textStyle: { color: 'rgb(252,211,158)', fontSize: 18, }
  },
  grid: {
      top: 5,
      bottom: 5,
  },
  color: ['pink'],
  series: [{
      name: 'valueOfMarket',
      type: 'pie',
      center: ['50%', '50%'], // 饼图的圆心坐标
      radius: ['60%', '70%'],
      avoidLabelOverlap: false,
      hoverAnimation: false,
      label: { //  饼图图形上的文本标签
          normal: { // normal 是图形在默认状态下的样式
              show: true,
              position: 'center',
              color: '#000000',
              fontSize: 14,
              fontWeight: 'bold',
              formatter: '{b}\n{c}%' // {b}:数据名； {c}：数据值； {d}：百分比
          }
      },
      data: [
          {
              value: 54,
              name: '做题正确率',
              label: {
                  normal: {
                      show: true
                  }
              }
          }
      ]
  }]
}

function chooseInitChart(type) {
  let mapOptions = new Map([['radar', option_radar], ['bar', option_bar], ['pie', option_pie], ['donut', option_donut]])
  return initChartWrapper(mapOptions.get(type))
}
function initChartWrapper(optionIn) {
  return function initChart(canvas, width, height, dpr) {
    chart = echarts.init(canvas, null, {
      width: width,
      height: height,
      devicePixelRatio: dpr // new
    });
    canvas.setChart(chart);
    chart.setOption(optionIn);
    return chart;
  }
}


Page({
  data: {
    ec: {
      onInit: chooseInitChart('radar'),
    },
    ecFlag: true
  },

  onReady() {
    console.log(this.data,'123')
    // 这里再请求数据api 将数据更新到option里面去 每次替换option里的数据为最新的 可能要改chooseInitChart的入参
    setTimeout(function () {
      // 获取 chart 实例的方式
      // console.log(chart)
    }, 2000);
  },
  onChange(event) {
    this.setData({
      ec: {
        onInit: chooseInitChart(event.detail.name)
      },
      ecFlag: false
    }, ()=>{
      this.setData({
        ecFlag: true         // 触发Echarts重新渲染
      })
    })
  },
});