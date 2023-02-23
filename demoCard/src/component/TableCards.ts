class TableCards extends eui.Group {
    private lastTop = 0;
    private lastLeft = 0;

    protected createChildren(): void {
        super.createChildren();
    }
    //TODO:  让 card 按点数接起来
    public addCard(card, currRotaion) {
        let maxWidth = 600;
        let cardImg = new eui.Image();
        cardImg.source = RES.getRes("card_" + card.head + "_" + card.tail);
        console.log('img:' + "card_" + card.head + "_" + card.tail)
        cardImg.width = 30;
        cardImg.height = 75;
        cardImg.rotation = 0;
        let dis = 10;
        if (card.head != card.tail) {
            // 横着放
            console.log("card rotaion: ", currRotaion, " card:", card);
            cardImg.rotation = currRotaion;
            if (this.lastLeft + cardImg.height + dis > maxWidth) {
                this.lastTop += 100;
                this.lastLeft = 0
            }
            cardImg.top = this.lastTop;
            cardImg.left = this.lastLeft;
            this.lastLeft += cardImg.height + dis;
        } else {
            //竖着放
            if (this.lastLeft + cardImg.width + dis > maxWidth) {
                this.lastTop += 100;
                this.lastLeft = 0
            }
            cardImg.top = this.lastTop;
            cardImg.left = this.lastLeft;
            this.lastLeft += cardImg.width + dis;
        }
        this.addChild(cardImg);
    }

    public clear() {
        this.removeChildren();
        this.lastLeft = 0;
        this.lastTop = 0;
    }
}