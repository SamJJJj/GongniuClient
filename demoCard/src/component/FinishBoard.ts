class FinishBoard extends eui.Group {
    public closeHandler: Function
    private group: eui.Group;
    protected createChildren(): void {
        super.createChildren();
        let bg = new eui.Image();
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
        let layout = new eui.VerticalLayout();
        layout.gap = 10;
        layout.paddingTop = 20;
        layout.horizontalAlign = egret.HorizontalAlign.CENTER;
        layout.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.group.layout = layout;
        this.addChild(this.group);
        let close = new eui.Image();
        close.source = RES.getRes("close");
        close.top = 0;
        close.left = 0;
        close.addEventListener("touchTap", () => { this.closeHandler(); }, this)
        this.addChild(close)
    }

    public addScore(seat, score, playedCards: Card[], disabledCards: Card[], handCards: Card[]) {
        console.log(seat, " ", score, " ", playedCards, " ", disabledCards, " ", handCards);
        let scoreGroup = new eui.Group();
        let label = new eui.Label();
        label.size = 20;
        label.textColor = 0xFFFFFF;
        label.text = this.getNameForSeat(seat) + ":" + score;
        scoreGroup.addChild(label);

        let playLabel = new eui.Label();
        playLabel.size = 20;
        playLabel.textColor = 0xFFFFFF;
        playLabel.text = "已出："
        scoreGroup.addChild(playLabel);
        this.addCardsOnGroup(scoreGroup, playedCards);

        let disableLabel = new eui.Label();
        disableLabel.size = 20;
        disableLabel.textColor = 0xFFFFFF;
        disableLabel.text = "已扣："
        scoreGroup.addChild(disableLabel);
        this.addCardsOnGroup(scoreGroup, disabledCards);

        let handLabel = new eui.Label();
        handLabel.size = 20;
        handLabel.textColor = 0xFFFFFF;
        handLabel.text = "未出："
        scoreGroup.addChild(handLabel);
        this.addCardsOnGroup(scoreGroup, handCards);

        let layout = new eui.HorizontalLayout();
        layout.gap = 20;
        layout.verticalAlign = egret.VerticalAlign.MIDDLE;
        layout.horizontalAlign = egret.HorizontalAlign.LEFT;
        scoreGroup.layout = layout;
        this.group.addChild(scoreGroup)
    }

    private addCardsOnGroup(group: eui.Group, cards: Card[]) {
        if (cards == undefined) {
            return
        }
        for (let card of cards) {
            let cardImg = new eui.Image();
            cardImg.source = RES.getRes("card_" + card.head + "_" + card.tail);
            cardImg.width = 20;
            cardImg.height = 50;
            group.addChild(cardImg);
        }
    }

    private getNameForSeat(seat) {
        for (let player of Global.Instance.roomInfo.players) {
            if (player.seat == seat) {
                return player.user_info.nick_name;
            }
        }
    }
}