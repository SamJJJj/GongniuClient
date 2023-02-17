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
var FinishBoard = (function (_super) {
    __extends(FinishBoard, _super);
    function FinishBoard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FinishBoard.prototype.createChildren = function () {
        var _this = this;
        _super.prototype.createChildren.call(this);
        var bg = new eui.Image();
        bg.source = RES.getRes("finish_back");
        bg.width = 600;
        bg.height = 300;
        bg.verticalCenter = 0;
        bg.horizontalCenter = 0;
        this.addChild(bg);
        this.group = new eui.Group();
        this.group.verticalCenter = 0;
        this.group.horizontalCenter = 0;
        this.group.width = 600;
        this.group.height = 300;
        var layout = new eui.VerticalLayout();
        layout.gap = 10;
        layout.paddingTop = 20;
        layout.horizontalAlign = egret.HorizontalAlign.CENTER;
        layout.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.group.layout = layout;
        this.addChild(this.group);
        var close = new eui.Image();
        close.source = RES.getRes("close");
        close.top = 0;
        close.left = 0;
        close.addEventListener("touchTap", function () { _this.closeHandler(); }, this);
        this.addChild(close);
    };
    FinishBoard.prototype.addScore = function (seat, score) {
        var label = new eui.Label();
        label.size = 20;
        label.textColor = 0xFFFFFF;
        label.text = this.getNameForSeat(seat) + ":" + score;
        this.group.addChild(label);
    };
    FinishBoard.prototype.getNameForSeat = function (seat) {
        for (var _i = 0, _a = Global.Instance.roomInfo.players; _i < _a.length; _i++) {
            var player = _a[_i];
            if (player.seat == seat) {
                return player.user_info.nick_name;
            }
        }
    };
    return FinishBoard;
}(eui.Group));
__reflect(FinishBoard.prototype, "FinishBoard");
