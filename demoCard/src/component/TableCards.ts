class TableCards extends eui.Group {
    private lastTop = 0;
    private lastLeft = 0;

    protected createChildren(): void {
        super.createChildren();
    }

    public addCard(card) {
        let maxWidth = 600;
        let cardImg = new eui.Image();
        cardImg.source = RES.getRes("card_" + card.head + "_" + card.tail);
        console.log('img:' + "card_" + card.head + "_" + card.tail)
        cardImg.width = 30;
        cardImg.height = 75;
        if (card.head == card.tail) {
            // 横着放
            cardImg.rotation = -90;
            if (this.lastLeft + cardImg.height > maxWidth) {
                this.lastTop += 100;
                this.lastLeft = 0
            }
            cardImg.top = this.lastTop;
            cardImg.left = this.lastLeft;
            this.lastLeft += cardImg.height;
        } else {
            //竖着放
            if (this.lastLeft + cardImg.width > maxWidth) {
                this.lastTop += 100;
                this.lastLeft = 0
            }
            cardImg.top = this.lastTop;
            cardImg.left = this.lastLeft;
            this.lastLeft += cardImg.width;
        }
        this.addChild(cardImg);
    }
}