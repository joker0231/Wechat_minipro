const map = new Map([[0, 'A'], [1, 'B'], [2, 'C'], [3, 'D']])
Component({
    externalClasses: ['inner-class'],
    properties: {
        content: String,
        option: Array,
        userInput: String,
        resolution: String
    },
    data: {
      choiceMap: {},
      abc: '垃圾微信小程序'
    },
    methods: {},
    lifetimes: {
      attached: function() {
        // 在组件实例进入页面节点树时执行
        console.log(this.properties)
        this.setData({
          choiceMap: map
        })
      },
      detached: function() {
        // 在组件实例被从页面节点树移除时执行
      },
    }
});
