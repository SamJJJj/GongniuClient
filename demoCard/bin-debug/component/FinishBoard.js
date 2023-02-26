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
    FinishBoard.prototype.addScore = function (seat, score, playedCards, disabledCards, handCards) {
        console.log(seat, " ", score, " ", playedCards, " ", disabledCards, " ", handCards);
        var scoreGroup = new eui.Group();
        var label = new eui.Label();
        label.size = 20;
        label.textColor = 0xFFFFFF;
        label.text = this.getNameForSeat(seat) + ":" + score;
        scoreGroup.addChild(label);
        var playLabel = new eui.Label();
        playLabel.size = 20;
        playLabel.textColor = 0xFFFFFF;
        playLabel.text = "已出：";
        scoreGroup.addChild(playLabel);
        this.addCardsOnGroup(scoreGroup, playedCards);
        var disableLabel = new eui.Label();
        disableLabel.size = 20;
        disableLabel.textColor = 0xFFFFFF;
        disableLabel.text = "已扣：";
        scoreGroup.addChild(disableLabel);
        this.addCardsOnGroup(scoreGroup, disabledCards);
        var handLabel = new eui.Label();
        handLabel.size = 20;
        handLabel.textColor = 0xFFFFFF;
        handLabel.text = "未出：";
        scoreGroup.addChild(handLabel);
        this.addCardsOnGroup(scoreGroup, handCards);
        var layout = new eui.HorizontalLayout();
        layout.gap = 20;
        layout.verticalAlign = egret.VerticalAlign.MIDDLE;
        layout.horizontalAlign = egret.HorizontalAlign.LEFT;
        scoreGroup.layout = layout;
        this.group.addChild(scoreGroup);
    };
    FinishBoard.prototype.addCardsOnGroup = function (group, cards) {
        if (cards == undefined) {
            return;
        }
        for (var _i = 0, cards_1 = cards; _i < cards_1.length; _i++) {
            var card = cards_1[_i];
            var cardImg = new eui.Image();
            cardImg.source = RES.getRes("card_" + card.head + "_" + card.tail);
            cardImg.width = 20;
            cardImg.height = 50;
            group.addChild(cardImg);
        }
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
