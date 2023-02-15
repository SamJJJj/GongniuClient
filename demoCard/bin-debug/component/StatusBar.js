var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var StatusBar = (function (_super) {
    __extends(StatusBar, _super);
    function StatusBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StatusBar.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        var avartarFrame = new eui.Image();
        avartarFrame.source = RES.getRes("avartar_frame_png");
        avartarFrame.top = 10;
        avartarFrame.left = 10;
        avartarFrame.height = 80;
        avartarFrame.width = 80;
        this.addChild(avartarFrame);
        this.avatar = new eui.Image();
        this.avatar.top = 15;
        this.avatar.left = 15;
        this.avatar.width = 70;
        this.avatar.height = 70;
        this.addChild(this.avatar);
        this.nickName = new eui.Label();
        this.nickName.left = avartarFrame.width + 10;
        this.nickName.top = 20;
        this.nickName.size = 20;
        this.nickName.textColor = 0xFFFFFF;
        this.nickName.text = Global.Instance.userInfo.nickName;
        this.addChild(this.nickName);
    };
    StatusBar.prototype.loadImage = function (url) {
        var _this = this;
        var loader = new egret.ImageLoader();
        loader.crossOrigin = "anonymous";
        loader.load(url);
        loader.once(egret.Event.COMPLETE, function (evt) {
            console.log("图片加载成功");
            var texture = new egret.Texture();
            texture.bitmapData = evt.currentTarget.data;
            _this.avatar.source = texture;
        }, this);
    };
    return StatusBar;
}(eui.Group));
__reflect(StatusBar.prototype, "StatusBar");
