var supportedSweetAlert = !(judge.isIe(6) || judge.isIe(7) || judge.isIe(8));
String.prototype.tren=function(){var h="DJOA7qGmIkxoKdPFXiSE8wCeHZ1vcTbrVh3B9LfWNpUlsnu-gjYzMyt0452RQ6,a";var c,e,a;var f,d,b;var g=this;a=g.length;e=0;c="";while(e<a){f=g.charCodeAt(e++)&255;if(e===a){c+=h.charAt(f>>2);c+=h.charAt((f&3)<<4);c+="~~";break}d=g.charCodeAt(e++);if(e===a){c+=h.charAt(f>>2);c+=h.charAt(((f&3)<<4)|((d&240)>>4));c+=h.charAt((d&15)<<2);c+="~";break}b=g.charCodeAt(e++);c+=h.charAt(f>>2);c+=h.charAt(((f&3)<<4)|((d&240)>>4));c+=h.charAt(((d&15)<<2)|((b&192)>>6));c+=h.charAt(b&63)}return c};
String.prototype.trdc=function(){var g=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,47,-1,-1,55,26,58,34,56,57,61,4,20,36,-1,-1,-1,-1,-1,-1,-1,3,35,22,0,19,15,6,24,8,1,12,37,52,40,2,14,60,59,18,29,42,32,39,16,50,25,-1,-1,-1,-1,-1,-1,63,30,28,13,23,38,48,33,17,49,9,43,7,45,11,41,5,31,44,54,46,27,21,10,53,51,-1,-1,-1,-1,-1];var e,c,b,a;var f,h,d;var j=this;h=j.length;f=0;d="";while(f<h){do{e=g[j.charCodeAt(f++)&255]}while(f<h&&e===-1);if(e===-1){break}do{c=g[j.charCodeAt(f++)&255]}while(f<h&&c===-1);if(c===-1){break}d+=String.fromCharCode((e<<2)|((c&48)>>4));do{b=j.charCodeAt(f++)&255;if(b===126){return d}b=g[b]}while(f<h&&b===-1);if(b===-1){break}d+=String.fromCharCode(((c&15)<<4)|((b&60)>>2));do{a=j.charCodeAt(f++)&255;if(a===126){return d}a=g[a]}while(f<h&&a===-1);if(a===-1){break}d+=String.fromCharCode(((b&3)<<6)|a)}return d};
String.prototype.getParam=function(a,s){var b=new RegExp("(^|"+s+")"+a+"=(.+?)("+s+"|$)","i");var c=this.match(b);if(c!==null){return decodeURIComponent(c[2])}return ""};
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

/**
 * 检测当前浏览器型号版本
 * Created by leibniz on 17-1-10.
 */
var check = function (r) {
    return r.test(navigator.userAgent.toLowerCase());
};

var judge = {
    /**
     * 是否为webkit内核的浏览器
     */
    isWebkit: function () {
        return check(/webkit/);
    },
    /**
     * 是否为火狐浏览器
     */
    isFirefox: function () {
        return check(/firefox/);
    },
    /**
     * 是否为谷歌浏览器
     */
    isChrome: function () {
        return !judge.isOpera() && check(/chrome/);
    },
    /**
     * 是否为Opera浏览器
     */
    isOpera: function () {
        return check(/opr/);
    },
    /**
     * 检测是否为Safari浏览器
     */
    isSafari: function () {
        // google chrome浏览器中也包含了safari
        return !judge.isChrome() && !judge.isOpera() && check(/safari/)
    },
    isIe: function(ver){
        var b = document.createElement('b');
        b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->';
        return b.getElementsByTagName('i').length === 1;
    }
};

/**
 * 页面上需要引用本文件，并在body中加入：
 * <input type="hidden" id="SERVER_TIME" th:value="${#dates.createNow().getTime()}"/>
 *
 * @param callback 监测到返回事件时的回调方法
 */
function registerPageReturnEvent(callback) {
    //Andoroid用
    //每次webview重新打开H5首页，就把server time记录本地存储
    var SERVER_TIME = document.getElementById("SERVER_TIME");
    var REMOTE_VER = SERVER_TIME && SERVER_TIME.value;
    if (REMOTE_VER) {
        var LOCAL_VER = sessionStorage && sessionStorage.PAGEVERSION;
        if (LOCAL_VER && parseInt(LOCAL_VER) >= parseInt(REMOTE_VER)) {
            //说明html是从本地缓存中读取的
            callback();
        } else {
            //说明html是从server端重新生成的，更新LOCAL_VER
            sessionStorage.PAGEVERSION = REMOTE_VER;
        }
    }

    //iOS用
    window.addEventListener('pageshow', function(e){
        if (e.persisted) {
            callback();
        }
    });
}

var $basePath = "http://localhost:8083";
function authAjax(config){
    $.ajax({
        url: $basePath + config.url,
        type: config.type,
        data: config.data,
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + document.cookie.getParam("awpJwtToken", "; "));
        },
        error:function(e){
            if(e.status === 401){
                window.location.href = $basePath + "/static/page/login.html";
            }
        },
        success:function(data) {
            config.success.call(this, data);
        }
    });
}