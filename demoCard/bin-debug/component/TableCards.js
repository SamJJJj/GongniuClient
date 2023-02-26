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
    };
    //TODO:  让 card 按点数接起来
    TableCards.prototype.addCard = function (card, currRotaion) {
        var maxWidth = 600;
        var cardImg = new eui.Image();
        cardImg.source = RES.getRes("card_" + card.head + "_" + card.tail);
        console.log('img:' + "card_" + card.head + "_" + card.tail);
        cardImg.width = 30;
        cardImg.height = 75;
        cardImg.rotation = 0;
        var dis = 10;
        if (card.head != card.tail) {
            // 横着放
            console.log("card rotaion: ", currRotaion, " card:", card);
            cardImg.rotation = currRotaion;
            if (this.lastLeft + cardImg.height + dis > maxWidth) {
                this.lastTop += 100;
                this.lastLeft = 0;
            }
            cardImg.top = this.lastTop;
            cardImg.left = this.lastLeft;
            this.lastLeft += cardImg.height + dis;
        }
        else {
            //竖着放
            if (this.lastLeft + cardImg.width + dis > maxWidth) {
                this.lastTop += 100;
                this.lastLeft = 0;
            }
            cardImg.top = this.lastTop;
            cardImg.left = this.lastLeft;
            this.lastLeft += cardImg.width + dis;
        }
        this.addChild(cardImg);
    };
    TableCards.prototype.clear = function () {
        this.removeChildren();
        this.lastLeft = 0;
        this.lastTop = 0;
    };
    return TableCards;
}(eui.Group));
__reflect(TableCards.prototype, "TableCards");
