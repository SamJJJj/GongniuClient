var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WebUtil = (function () {
    function WebUtil() {
        this.connected = false;
        this.socket = new egret.WebSocket();
        this.socket.type = egret.WebSocket.TYPE_STRING;
        this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this.socket.addEventListener(egret.Event.CONNECT, this.onConnected, this);
        this.socket.addEventListener(egret.Event.CLOSE, this.onDisConnected, this);
        this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
    }
    WebUtil.default = function () {
        if (!WebUtil.inst) {
            WebUtil.inst = new WebUtil();
        }
        return WebUtil.inst;
    };
    WebUtil.prototype.connect = function (url) {
        this.socket.connectByUrl(url);
        this.start();
    };
    WebUtil.prototype.setReceiveCallback = function (callback, thisObject) {
        this.receiveCallback = callback;
        this.receiveThisObject = thisObject;
    };
    WebUtil.prototype.send = function (data) {
        this.socket.writeUTF(data);
        console.log(data);
    };
    WebUtil.prototype.clear = function () {
        this.timeout && clearTimeout(this.timeout);
        this.serverTimeout && clearTimeout(this.serverTimeout);
    };
    WebUtil.prototype.start = function () {
        // this.timeout = setTimeout(function () {
        //     let hb = Router.genJsonRequest("heartbeat", {});
        //     WebUtil.default().send(hb);
        //     this.serverTimeout = setTimeout(function () {
        //         console.log("heat beat expired")
        // this.socket.close();
        //     }, 360)
        // }, 180)
    };
    WebUtil.prototype.onReceiveMessage = function (e) {
        var jsonStr = this.socket.readUTF();
        console.log(jsonStr);
        if (null == this.receiveCallback) {
            return;
        }
        var jsonObj = JSON.parse(jsonStr);
        if (jsonObj.cmd == "heartbeat") {
            this.clear();
            this.start();
        }
        this.receiveCallback.call(this.receiveThisObject, jsonObj);
    };
    WebUtil.prototype.onConnected = function () {
        // 需要向外发送，只有open了才能发请求
        this.connected = true;
        console.log("connected");
    };
    WebUtil.prototype.onDisConnected = function () {
        // 断开连接需要处理 需要 弹出错误提示 --> 重新连接
    };
    WebUtil.prototype.onError = function () {
        console.log("error");
    };
    return WebUtil;
}());
__reflect(WebUtil.prototype, "WebUtil");
