var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Global = (function () {
    function Global() {
        this.roomInfo = { roomId: '0', currSeat: 0, masterSeat: 0, players: [] };
        this.userInfo = { nickName: "test" + this.randomString(3), userId: "123" + this.randomString(6), avatarUrl: "" };
    }
    Object.defineProperty(Global, "Instance", {
        get: function () {
            if (Global._manager == null) {
                Global._manager = new Global();
            }
            return Global._manager;
        },
        enumerable: true,
        configurable: true
    });
    Global.prototype.randomString = function (length) {
        var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var result = '';
        for (var i = length; i > 0; --i)
            result += str[Math.floor(Math.random() * str.length)];
        return result;
    };
    Global.prototype.setUserInfo = function (info) {
        console.log(info);
        this.userInfo = info;
    };
    Global.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Global;
}());
__reflect(Global.prototype, "Global");
