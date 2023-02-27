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
var Toast = (function (_super) {
    __extends(Toast, _super);
    function Toast(text) {
        var _this = _super.call(this) || this;
        _this._bg = new egret.Shape();
        _this._bg.graphics.beginFill(0x000000, 0.7);
        _this._bg.graphics.drawRoundRect(0, 0, 200, 50, 20);
        _this._bg.graphics.endFill();
        _this.addChild(_this._bg);
        _this._text = new egret.TextField();
        _this._text.width = 200;
        _this._text.height = 50;
        _this._text.textColor = 0xffffff;
        _this._text.textAlign = egret.HorizontalAlign.CENTER;
        _this._text.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._text.text = text;
        _this.addChild(_this._text);
        return _this;
    }
    Toast.prototype.show = function (parent, x, y) {
        var _this = this;
        this.x = x;
        this.y = y;
        parent.addChild(this);
        setTimeout(function () {
            _this.parent.removeChild(_this);
        }, 2000);
    };
    return Toast;
}(egret.DisplayObjectContainer));
__reflect(Toast.prototype, "Toast");
