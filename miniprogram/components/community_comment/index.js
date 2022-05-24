// components/community_comment/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    comment_main: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickComment: function() {
      console.log('触发内部')
      this.triggerEvent('subcomment', {}, {})
    }
  }
})
