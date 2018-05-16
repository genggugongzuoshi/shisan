// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var Socket = cc.Class({
    extends: cc.Component,

    properties: {
        _lastReceiveMsgTime: 0, // 最后一次收到消息时间(毫秒)
        _timeout: 8, // 超时时长 （秒）
    },
    statics:{
        instance:null,
        url:"ws://39.108.142.84:5041"
    },

    onLoad:function () {
        Socket.instance = this;
        this.name = "socket";
        cc.game.addPersistRootNode(this.node);
        if(cc.game.isPersistRootNode(this.node)){
            console.log("加载全局节点 Socket 成功！");
        }

        this.isCreating = false;
        this.createIndex = 0;
        this.socketError = false;

        this.createSocket();

    },

    createSocket:function () {
        this.createIndex ++;
        if(this.createIndex > 5){
            console.log("网络连接计数 过多");
        }
        this.isCreating = true;

       // this.ws = new WebSocket(Socket.url);

        this.ws = wx.connectSocket({
            url: Socket.url,
        });

        if(!this.ws){
            console.log("创建 Socket 失败！");
            return;
        }

        this.ws.onopen = function (event) {
            this.isCreating = false;
            this.createIndex = 0;
            this.socketError = false;
        }


    }

    // update (dt) {},
});

module.exports = Socket;