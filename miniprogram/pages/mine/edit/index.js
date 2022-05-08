Page({
    data: {
        showname:false,
        showsex:false,
        showschool:false,
        showgrade:false,
        showclass:false,
        showphone:false,
        name:"crystal",
        sex:"女",
        school:"武汉中学",
        grade:"高三",
        classes:4,
        phone:18702745270,
        src:"https://6c65-lemon-7glhwqyu5304e1f9-1311072024.tcb.qcloud.la/logo.png?sign=7498adb7808f9afc24f81d87678a5e72&t=1651824452"
    },
    onLoad: function (options) {
    },
    showname:function (){
        this.setData({
            showname:true
        })
    },
    closename: function (){
        this.setData({
            showname:false
        })
    },
    showsex:function (){
        this.setData({
            showsex:true
        })
    },
    closesex: function (){
        this.setData({
            showsex:false
        })
    },
    showschool:function (){
        this.setData({
            showschool:true
        })
    },
    closeschool: function (){
        this.setData({
            showschool:false
        })
    },
    showgrade:function (){
        this.setData({
            showgrade:true
        })
    },
    closegrade: function (){
        this.setData({
            showgrade:false
        })
    },
    showclass:function (){
        this.setData({
            showclass:true
        })
    },
    closeclass: function (){
        this.setData({
            showclass:false
        })
    },
    showphone:function (){
        this.setData({
            showphone:true
        })
    },
    closephone: function (){
        this.setData({
            showphone:false
        })
    }
});