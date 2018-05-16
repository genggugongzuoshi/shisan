var manager = require('manager');
const Socket = require('socket');
cc.Class({
    extends: cc.Component,

    properties: {
        canvasNode:cc.Node,
        loadingNode:cc.Node,
        isGuest:false
    },

    // use this for initialization
    onLoad: function () {
        //this.socket = cc.find('GameSocket').getCompoment('socket');
        this.socket = Socket.instance;
    },

    // called every frame
    update: function (dt) {

    },

    //微信登录
    loginForWeiXin:function () {
        console.log("微信登录");
        this.isGuest = false;
        this.login();

    },


    //游客数据
    getGuestUserInfo:function(){
        var nickName =  manager.getRandomGuestNiceName(8);
        var openid = new Buffer(new Date().toLocaleString()).toString('base64');
        var unionid = 'guest_' + nickName;
        var testData = '{"openid":"'+openid+'","nickname":"'+nickName+'","unionid":"'+unionid+'","sex":1,"language":"zh_CN","city":"Changsha","province":"Hunan","country":"CN","headimgurl":"http:\/\/wx.qlogo.cn\/mmopen\/8D8dOtAcDic5Sichv3lxtMXYJgmunTLOLvTT5AFM4zaqKEthZibv8xdWkgjN9Yb4AQnwvSurz27UB29xx81XORwx55XanxqctdD\/0","privilege":[]}';
        return testData;
    },

    //随机游客登录
    loginForGuest:function(){
        console.log("游客登录");
        this.isGuest = true;
        this.login();
    },

    //请求服务器登录
    requestServerLogin:function(userInfo){
        cc.find('Canvas/loading').active = true;
        this.loadingNode.runAction(cc.repeatForever(cc.rotateBy(2,360)));
        //this.socket.sendMessage('login',userInfo);
    },


    //登录接口
    login:function () {

        //游客登录 读取缓存用户信息
        var info = manager.getUserInfo();
        if(this.isGuest)
        {
            if(!cc.sys.isNative){
                if(info.length > 0){
                    var userInfo = JSON.parse(info);
                    //登录
                    this.requestServerLogin(userInfo);
                }else{
                    //获取新游客数据登录
                    var userInfo = this.getGuestUserInfo();
                    //登录
                    this.requestServerLogin(userInfo);
                }
            }
            return;
        }

        //网页请求方式 暂时不用
        if(!cc.sys.isNative){
            window.location.href = manager.getWinXinUrl();
            console.log("登录微信请求ip " + window.location.href);
        }

    }
});
