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
var TableCards = (function (_super) {
    __extends(TableCards, _super);
    function TableCards() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lastTop = 0;
        _this.lastLeft = 0;
        return _this;
    }
    TableCards.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        var outline = new egret.Shape;
        outline.graphics.lineStyle(3, 0xFFFFFF);
        outline.graphics.beginFill(0x000000, 0);
        outline.graphics.drawRect(0, 0, 600, 250); /// 注意该轮廓为Shape，没有参与布局，所以其尺寸并不能影响容器的尺寸
        outline.graphics.endFill();
        this.addChild(outline);
    };
    TableCards.prototype.addCard = function (card) {
        var maxWidth = 600;
        var cardImg = new eui.Image();
        cardImg.source = RES.getRes("card_" + card.head + "_" + card.tail);
        console.log('img:' + "card_" + card.head + "_" + card.tail);
        cardImg.width = 30;
        cardImg.height = 75;
        if (card.head == card.tail) {
            // 横着放
            cardImg.rotation = -90;
            if (this.lastLeft + cardImg.height > maxWidth) {
                this.lastTop += 100;
                this.lastLeft = 0;
            }
            cardImg.top = this.lastTop;
            cardImg.left = this.lastLeft;
            this.lastLeft += cardImg.height;
        }
        else {
            //竖着放
            if (this.lastLeft + cardImg.width > maxWidth) {
                this.lastTop += 100;
                this.lastLeft = 0;
            }
            cardImg.top = this.lastTop;
            cardImg.left = this.lastLeft;
            this.lastLeft += cardImg.width;
        }
        this.addChild(cardImg);
    };
    return TableCards;
}(eui.Group));
__reflect(TableCards.prototype, "TableCards");
