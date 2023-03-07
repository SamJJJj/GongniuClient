class WebUtil {
    public static default(): WebUtil {
        if (!WebUtil.inst) {
            WebUtil.inst = new WebUtil();
        }
        return WebUtil.inst;
    }

    public connected = false;

    private timeout;
    private serverTimeout;

    constructor() {
        this.socket = new egret.WebSocket();
        this.socket.type = egret.WebSocket.TYPE_STRING
        this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this.socket.addEventListener(egret.Event.CONNECT, this.onConnected, this);
        this.socket.addEventListener(egret.Event.CLOSE, this.onDisConnected, this);
        this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
    }

    private static inst: WebUtil;

    private socket;

    private receiveCallback: Function;

    private receiveThisObject: any;

    public connect(url: string): void {
        this.socket.connectByUrl(url);
    }

    public setReceiveCallback(callback: Function, thisObject: any): void {
        this.receiveCallback = callback;
        this.receiveThisObject = thisObject;
    }

    public send(data) {
        this.socket.writeUTF(data);
        console.log(data)
    }

    private clear() {
        this.timeout && clearTimeout(this.timeout);
        this.serverTimeout && clearTimeout(this.serverTimeout);
    }

    private start() {
        // this.timeout = setTimeout(function () {
        //     let hb = Router.genJsonRequest("heartbeat", {});
        //     WebUtil.default().send(hb);
        //     this.serverTimeout = setTimeout(function () {
        //         console.log("heat beat expired")
        //         this.socket.close();
        //     }, 360)
        // }, 180)
    }

    private onReceiveMessage(e: egret.Event): void {
        var jsonStr = this.socket.readUTF();
        console.log(jsonStr)
        if (null == this.receiveCallback) {
            return;
        }
        var jsonObj = JSON.parse(jsonStr);
        if (jsonObj.cmd == "heartbeat") {
            this.clear();
            this.start();
        }
        this.receiveCallback.call(this.receiveThisObject, jsonObj);
    }

    private onConnected(): void {
        // 需要向外发送，只有open了才能发请求
        this.connected = true;
        console.log("connected")
        this.start();
    }

    private onDisConnected(): void {
        // 断开连接需要处理 需要 弹出错误提示 --> 重新连接
    }

    private onError(): void {
        console.log("error");
    }
}