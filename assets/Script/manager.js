//用户数据 以及 声音 本地存储与读取
module.exports={
    version:'v1.0.0',
   // APPID:'wxa5640e82086ca1da',
    APPID:'wxbdd9777f3c37b558',
    REDIRECT_URI:"http%3a%2f%2f13z.shenyuzhizun.com%2findex.php",

    setUserInfo:function (str) {
        cc.sys.localStorage.setItem('userinfo',str);
    },

    getUserInfo:function () {
        var value = cc.sys.localStorage.getItem('userinfo');
        if(!value)
            return "";
        return value;
    },

    getWinXinUrl:function () {
       var HREF = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+this.APPID+"&redirect_uri="+this.REDIRECT_URI+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
       return HREF;
    },

    //获取随机 N 位 游客昵称
    getRandomGuestNiceName:function (num) {
        /**
         * 返回一个字母
         */
        function getCharacter(flag){
            var character = "";
            if(flag === "lower"){
                character = String.fromCharCode(Math.floor( Math.random() * 26) + "a".charCodeAt(0));
            }
            if(flag === "upper"){
                character = String.fromCharCode(Math.floor( Math.random() * 26) + "A".charCodeAt(0));
            }
            return character;
        }

        var str = "";
        for(var i=0;i<num;i++)
        {
            var flag = "lower" ;
            var random = Math.floor(Math.random() * 3);
            if(random == 0)
            {
                flag = "upper" ;
                str += getCharacter(flag);
            }else if(random == 1)
            {
                str += getCharacter(flag);
            }else
            {
                str += Math.floor(Math.random() * 10);
            }
        }
        return str;
    }

}
