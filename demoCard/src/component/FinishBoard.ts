class FinishBoard extends eui.Group {
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
    }

    public addScore(seat, score) {
        let label = new eui.Label();
        label.size = 20;
        label.textColor = 0xFFFFFF;
        label.text = this.getNameForSeat(seat) + ":" + score;
        this.group.addChild(label);
    }

    private getNameForSeat(seat) {
        for (let player of Global.Instance.roomInfo.players) {
            if (player.seat == seat) {
                return player.user_info.nick_name;
            }
        }
    }
}