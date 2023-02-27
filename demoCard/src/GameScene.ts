type Card = {
    head: number;
    tail: number;
}

class GameScene extends eui.Group {
    constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        Router.registerHandler(Router.cmd.NotifyRoomMemChange, this.memberChangeHandler, this);
        Router.registerHandler(Router.cmd.PlayerReady, this.readyHandler, this);
        Router.registerHandler(Router.cmd.NotifyGameStart, this.gameStart, this);
        Router.registerHandler(Router.cmd.GetHandCards, this.getCardsHandler, this);
        Router.registerHandler(Router.cmd.PlayCard, this.playCardHandler, this);
        Router.registerHandler(Router.cmd.DisableCard, this.disableCardHandler, this);
        Router.registerHandler(Router.cmd.NotifyGamePlaying, this.gamePlaying, this);
        Router.registerHandler(Router.cmd.NotifyGameFinished, this.showFinish, this);
        Router.registerHandler(Router.cmd.LeaveRoom, this.leaveRoomHandler, this);
    }

    private async onAddToStage(event: egret.Event) {
        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.loadResource().catch(e => {
            console.log(e);
        })
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            await RES.loadConfig("resource/card.res.json", "resource/");
            await RES.loadGroup("cards", 0, loadingView);
            console.log("load cards OK")
        }
        catch (e) {
            console.error(e);
        }
    }

    private readyButton: eui.Image;
    private leaveButton: eui.Image;

    private cardGroups: eui.Group[] = new Array<eui.Group>(4);
    private avartars: eui.Image[] = new Array<eui.Image>(4);
    private readyIcons: eui.Image[] = new Array<eui.Image>(4);
    private playingArrows: eui.Image[] = new Array<eui.Image>(4);
    private userNameLabels: eui.Label[] = new Array<eui.Label>(4);
    private cards: Card[];
    private tableCards: Card[] = new Array<Card>(0);
    private cardRotations: number[] = new Array<number>(0);
    private tableCardGroup: TableCards;
    private selectedIdx = -1;
    private lastPlayedCard = -1;
    private playButton: eui.Image;
    private disableButton: eui.Image;
    private headButton: eui.Image;
    private tailButton: eui.Image;

    protected createChildren(): void {
        super.createChildren();
        let backgroud = Global.createBitmapByName("bg_png");
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        backgroud.width = stageW;
        backgroud.height = stageH;
        this.addChild(backgroud)

        var roomIdLabel = new eui.Label();
        roomIdLabel.textColor = 0xFFFFFF;
        roomIdLabel.size = 30;
        roomIdLabel.x = 20;
        roomIdLabel.y = 20;
        roomIdLabel.text = "房间号:" + Global.Instance.roomInfo.roomId;
        this.addChild(roomIdLabel);

        this.readyButton = new eui.Image();
        this.readyButton.source = RES.getRes("ready_png");
        this.readyButton.width = 100;
        this.readyButton.height = 60;
        this.readyButton.horizontalCenter = 0;
        this.readyButton.bottom = 100;
        this.readyButton.addEventListener("touchTap", this.readyButtonHanler, this);

        this.leaveButton = new eui.Image();
        this.leaveButton.source = RES.getRes("close");
        this.leaveButton.right = 50;
        this.leaveButton.top = 50;
        this.leaveButton.visible = false;
        this.leaveButton.addEventListener("touchTap", this.leaveHandler, this);

        this.addChild(this.readyButton);
        this.addAvatars();
        this.addReadyIcons();
        this.addNameLables();
        this.updateRoomMemberInfo();
        this.addTableCardGroup();
        this.addPlayArrows();
        this.addChild(this.leaveButton);
    }

    private addAvatars() {
        let i = 0;
        let width = 60;
        let height = 60;
        for (i = 0; i < 4; ++i) {
            let avartar = new eui.Image();
            avartar.width = width;
            avartar.height = height;
            avartar.visible = false;
            this.avartars[i] = avartar;
        }
        // 0 代表自己 1 下家， 2 ...
        // 布局
        // this.avartars[0].verticalCenter = 250;
        // this.avartars[0].horizontalCenter = 0;
        // this.avartars[1].verticalCenter = 0;
        // this.avartars[1].horizontalCenter = 450;
        // this.avartars[2].verticalCenter = -250;
        // this.avartars[2].horizontalCenter = 0;
        // this.avartars[3].verticalCenter = 0;
        // this.avartars[3].horizontalCenter = -450;

        this.avartars[0].bottom = 30;
        this.avartars[0].horizontalCenter = 0;
        this.avartars[1].verticalCenter = 0;
        this.avartars[1].right = 20;
        this.avartars[2].top = 20;
        this.avartars[2].horizontalCenter = 0;
        this.avartars[3].verticalCenter = 0;
        this.avartars[3].left = 20;

        for (i = 0; i < 4; ++i) {
            this.addChild(this.avartars[i]);
            if (i == 0) {
                this.avartars[i].visible = true;
                this.loadImageForSeat(Global.Instance.userInfo.avatarUrl, i);
            }
        }
    }

    private addReadyIcons() {
        let i = 0;
        let width = 100;
        let height = 60;
        for (i = 0; i < 4; ++i) {
            let icon = new eui.Image();
            icon.width = width;
            icon.height = height;
            icon.visible = false;
            icon.source = RES.getRes("ready_icon_png");
            icon.rotation = -(i * 90);
            this.readyIcons[i] = icon;
        }
        // 布局
        // 0 代表自己 1 下家， 2 ...
        // 布局
        this.readyIcons[0].bottom = 30;
        this.readyIcons[0].horizontalCenter = 100;
        this.readyIcons[1].verticalCenter = -100;
        this.readyIcons[1].right = 20;
        this.readyIcons[2].top = 20;
        this.readyIcons[2].horizontalCenter = -100;
        this.readyIcons[3].verticalCenter = 100;
        this.readyIcons[3].left = 20;

        for (i = 0; i < 4; ++i) {
            this.addChild(this.readyIcons[i]);
        }
    }

    private addPlayArrows() {
        let i = 0;
        let width = 40;
        let height = 40;
        for (i = 0; i < 4; ++i) {
            let icon = new eui.Image();
            icon.width = width;
            icon.height = height;
            icon.visible = false;
            icon.source = RES.getRes("play_arrow");
            icon.rotation = -(i * 90);
            this.playingArrows[i] = icon;
            console.log("arrows initiated: i:", i, "icon:", icon);
        }

        this.playingArrows[0].bottom = 90;
        this.playingArrows[0].horizontalCenter = 0;
        this.playingArrows[1].verticalCenter = 0;
        this.playingArrows[1].right = 90;
        this.playingArrows[2].top = 90;
        this.playingArrows[2].horizontalCenter = 0;
        this.playingArrows[3].verticalCenter = 0;
        this.playingArrows[3].left = 90;

        for (i = 0; i < 4; ++i) {
            this.addChild(this.playingArrows[i]);
        }
    }

    private addNameLables() {
        let i = 0;
        for (i = 0; i < 4; ++i) {
            let label = new eui.Label();
            label.textColor = 0xFFFFFF;
            label.size = 20;
            label.visible = false;
            this.userNameLabels[i] = label
        }
        this.userNameLabels[0].bottom = 0;
        this.userNameLabels[0].horizontalCenter = 0;
        this.userNameLabels[1].verticalCenter = 50;
        this.userNameLabels[1].right = 20;
        this.userNameLabels[2].top = 80;
        this.userNameLabels[2].horizontalCenter = 0;
        this.userNameLabels[3].verticalCenter = 50;
        this.userNameLabels[3].left = 20;

        for (i = 0; i < 4; ++i) {
            this.addChild(this.userNameLabels[i]);
        }
    }

    private updateRoomMemberInfo() {
        let dis = Global.Instance.roomInfo.currSeat;
        this.leaveButton.visible = true;
        for (let seat = 0; seat < 4; ++seat) {
            this.avartars[seat].visible = false;
            this.readyIcons[seat].visible = false;
            this.userNameLabels[seat].visible = false;
        }
        for (let player of Global.Instance.roomInfo.players) {
            let seat = (player.seat - dis + 4) % 4;
            this.avartars[seat].visible = true;
            this.loadImageForSeat(player.user_info.avatar_url, seat);
            // this.loadImageForSeat("http://rongcloud-web.qiniudn.com/docs_demo_rongcloud_logo.png", seat);
            if (player.is_ready) {
                this.readyIcons[seat].visible = true;
            }
            this.userNameLabels[seat].text = player.user_info.nick_name;
            this.userNameLabels[seat].visible = true;
        }
    }

    private addTableCardGroup() {
        this.tableCardGroup = new TableCards();
        this.tableCardGroup.verticalCenter = 0;
        this.tableCardGroup.horizontalCenter = 0;
        this.tableCardGroup.width = 600;
        this.tableCardGroup.height = 250;
        this.addChild(this.tableCardGroup);
    }

    private memberChangeHandler(data) {
        let resp = data.response;
        let info = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(egret.Base64Util.decode(resp.data))))
        if (resp.code == 0) {
            console.log(info)
            console.log("member changed");
            // 切换到 room 场景
            Global.Instance.roomInfo.masterSeat = info.master_seat;
            Global.Instance.roomInfo.players = info.players;
            console.log("len: ", Global.Instance.roomInfo.players.length);
            for (let i = 0; i < Global.Instance.roomInfo.players.length; ++i) {
                if (Global.Instance.roomInfo.players[i].seat == Global.Instance.roomInfo.currSeat) {
                    continue;
                }
                Global.Instance.roomInfo.players[i].user_info.nick_name = decodeURIComponent(Global.Instance.roomInfo.players[i].user_info.nick_name)
                console.log("decoded: ", decodeURIComponent(Global.Instance.roomInfo.players[i].user_info.nick_name));
            }
        }
        this.updateRoomMemberInfo();
    }

    private loadImageForSeat(url, i) {
        this.loadImage(url, this.avartars[i]);
    }

    // 加载头像
    private loadImage(url, image) {
        let loader = new egret.ImageLoader();
        loader.crossOrigin = "anonymous";
        loader.load(url);
        loader.once(egret.Event.COMPLETE, (evt: egret.Event) => {
            console.log("图片加载成功" + url);
            let texture = new egret.Texture();
            texture.bitmapData = evt.currentTarget.data;
            image.source = texture;
        }, this)
    }

    private readyButtonHanler() {
        let cmd = Router.cmd.PlayerReady;
        let req = Router.genJsonRequest(cmd, {
            "user_id": Global.Instance.userInfo.userId,
            "room_id": Global.Instance.roomInfo.roomId,
        });
        WebUtil.default().send(req);
    }

    private readyHandler(data) {
        let resp = data.response;
        let info = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(egret.Base64Util.decode(resp.data))))
        if (resp.code == 0) {
            console.log(info);
            this.readyButton.visible = false;
            this.readyIcons[0].visible = true;
        } else {
            // 准备请求失败，show tips
            console.log("ready request error");
            let toast = new Toast("准备失败，请重试！")
            toast.show(this, 500, 300);
        }
    }

    private leaveHandler() {
        let cmd = Router.cmd.LeaveRoom;
        let req = Router.genJsonRequest(cmd, {
            "user_id": Global.Instance.userInfo.userId,
        });
        WebUtil.default().send(req);
    }

    private leaveRoomHandler(data) {
        let resp = data.response;
        // let info = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(egret.Base64Util.decode(resp.data))))
        if (resp.code == 0) {
            // 转到home scene
            let hall = new HallScene();
            hall.width = this.stage.width;
            hall.height = this.stage.height;
            // 置空房间信息
            // Global.Instance.roomInfo = null;
            SceneManager.Instance.pushScene(hall);
        } else {
            let toast = new Toast("离开房间失败请重试！")
            toast.show(this, 500, 300);
            console.log("leave Room failed");
        }
    }

    private gameStart() {
        this.leaveButton.visible = false;
        this.readyButton.visible = false;
        for (let icon of this.readyIcons) {
            icon.visible = false;
        }
        this.leaveButton.visible = false;
        // 获取手牌请求
        let cmd = Router.cmd.GetHandCards;
        let req = Router.genJsonRequest(cmd, {
            "user_id": Global.Instance.userInfo.userId,
            "room_id": Global.Instance.roomInfo.roomId,
            "seat_no": String(Global.Instance.roomInfo.currSeat),
        })
        WebUtil.default().send(req);
    }

    private getCardsHandler(data) {
        // 获取卡牌并显示
        let resp = data.response;
        let info = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(egret.Base64Util.decode(resp.data))))
        if (resp.code == 0) {
            this.cards = info.cards;
            // 展示卡牌， 发送确认收到请求
            this.showCards();
            this.checkGetCard();
        } else {
            let toast = new Toast("获取手牌失败")
            toast.show(this, 500, 300);
        }
    }

    private checkGetCard() {
        let cmd = Router.cmd.CheckGetCards;
        let req = Router.genJsonRequest(cmd, {
            "user_id": Global.Instance.userInfo.userId,
            "room_id": Global.Instance.roomInfo.roomId,
        })
        WebUtil.default().send(req);
    }

    private showCards() {
        let cards = new Array<eui.Image>(6);
        let i = 0;
        for (let card of this.cards) {
            let image = new eui.Image();
            image.source = RES.getRes("card_" + card.head + "_" + card.tail);
            image.height = 100;
            image.width = 40;
            image.addEventListener("touchTap", (e) => {
                let i = 0;
                for (let card of cards) {
                    if (e.target == card) {
                        break;
                    }
                    ++i;
                }
                this.selectedIdx = i;
                for (let card of cards) {
                    if (e.target == card) {
                        card.top = -20;
                    } else {
                        card.top = 0;
                    }
                }
            }, this);
            cards[i++] = image;
        }
        let initleft = 0;
        let group = new eui.Group()
        group.left = 300;
        group.top = 430;
        for (let card of cards) {
            group.addChild(card);
            card.left = initleft;
            card.top = 0;
            initleft += 50;
        }
        this.addChild(group);

        this.playButton = new eui.Image();
        this.playButton.source = RES.getRes("play_card");
        this.playButton.top = 530;
        this.playButton.left = 300;
        this.playButton.width = 80;
        this.playButton.height = 80;
        this.playButton.visible = false;
        this.addChild(this.playButton);
        this.playButton.addEventListener("touchTap", this.playButtonHandler, this);

        this.headButton = new eui.Image();
        this.headButton.source = RES.getRes("on_head");
        this.headButton.top = 530;
        this.headButton.left = 300;
        this.headButton.width = 80;
        this.headButton.height = 80;
        this.headButton.visible = false;
        this.addChild(this.headButton);
        this.headButton.addEventListener("touchTap", this.headButtonHandler, this);

        this.disableButton = new eui.Image();
        this.disableButton.source = RES.getRes("disable_card");
        this.disableButton.top = 530;
        this.disableButton.left = 400;
        this.disableButton.width = 80;
        this.disableButton.height = 80;
        this.disableButton.visible = false;
        this.addChild(this.disableButton);
        this.disableButton.addEventListener("touchTap", this.disableButtonHandler, this);

        this.tailButton = new eui.Image();
        this.tailButton.source = RES.getRes("on_tail");
        this.tailButton.top = 530;
        this.tailButton.left = 400;
        this.tailButton.width = 80;
        this.tailButton.height = 80;
        this.tailButton.visible = false;
        this.addChild(this.tailButton);
        this.tailButton.addEventListener("touchTap", this.tailButtonHandler, this);

        this.cardGroups[0] = group;
    }

    private playButtonHandler() {
        if (this.selectedIdx == -1) {
            console.log("no selected card");
            return
        }
        let cmd = Router.cmd.PlayCard;
        this.lastPlayedCard = this.selectedIdx;
        let req = Router.genJsonRequest(cmd, {
            "user_id": Global.Instance.userInfo.userId,
            "room_id": Global.Instance.roomInfo.roomId,
            "seat": Global.Instance.roomInfo.currSeat,
            "card": this.cards[this.selectedIdx],
            "on_head": 0
        })
        WebUtil.default().send(req);
    }

    private headButtonHandler() {
        if (this.selectedIdx == -1) {
            console.log("no selected card");
            return
        }
        let cmd = Router.cmd.PlayCard;
        this.lastPlayedCard = this.selectedIdx;
        let req = Router.genJsonRequest(cmd, {
            "user_id": Global.Instance.userInfo.userId,
            "room_id": Global.Instance.roomInfo.roomId,
            "seat": Global.Instance.roomInfo.currSeat,
            "card": this.cards[this.selectedIdx],
            "on_head": 1
        })
        WebUtil.default().send(req);
    }

    private tailButtonHandler() {
        if (this.selectedIdx == -1) {
            console.log("no selected card");
            return
        }
        let cmd = Router.cmd.PlayCard;
        this.lastPlayedCard = this.selectedIdx;
        let req = Router.genJsonRequest(cmd, {
            "user_id": Global.Instance.userInfo.userId,
            "room_id": Global.Instance.roomInfo.roomId,
            "seat": Global.Instance.roomInfo.currSeat,
            "card": this.cards[this.selectedIdx],
            "on_head": 2
        })
        WebUtil.default().send(req);
    }

    private playCardHandler(data) {
        let resp = data.response;
        let info = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(egret.Base64Util.decode(resp.data))));
        console.log("play card: ", info);
        if (resp.code == 0) {
            if (info.need_choose_side == true) {
                this.playButton.visible = false;
                this.disableButton.visible = false;
                this.headButton.visible = true;
                this.tailButton.visible = true;
                this.cardGroups[0].touchEnabled = false;
            } else {
                let icon = new eui.Image();
                icon.source = RES.getRes("play_card");
                // icon.alpha = 0.8;
                icon.width = 40;
                icon.height = 40;
                // 给出过的牌增加标记
                for (let i = 0; i < this.cardGroups[0].numChildren; ++i) {
                    (this.cardGroups[0].getChildAt(i) as eui.Image).top = 0;
                }
                icon.x = this.cardGroups[0].getChildAt(this.lastPlayedCard).x;
                icon.y = this.cardGroups[0].getChildAt(this.lastPlayedCard).y + 20;
                this.cardGroups[0].addChild(icon);
                this.cardGroups[0].touchEnabled = true;
            }
        } else {
            // 提示失败
            let toast = new Toast("出牌不符合规则！")
            toast.show(this, 500, 300);
        }
    }

    private disableButtonHandler() {
        if (this.selectedIdx == -1) {
            console.log("no selected card");
            return
        }
        let cmd = Router.cmd.DisableCard;
        this.lastPlayedCard = this.selectedIdx;
        let req = Router.genJsonRequest(cmd, {
            "user_id": Global.Instance.userInfo.userId,
            "room_id": Global.Instance.roomInfo.roomId,
            "seat": Global.Instance.roomInfo.currSeat,
            "card": this.cards[this.selectedIdx],
        })
        WebUtil.default().send(req);
    }

    private disableCardHandler(data) {
        let resp = data.response;
        let info = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(egret.Base64Util.decode(resp.data))));
        if (resp.code == 0) {
            let icon = new eui.Image();
            icon.source = RES.getRes("disable_card");
            // icon.alpha = 0.8;
            icon.width = 40;
            icon.height = 40;
            // 恢复位置
            for (let i = 0; i < this.cardGroups[0].numChildren; ++i) {
                (this.cardGroups[0].getChildAt(i) as eui.Image).top = 0;
            }
            icon.x = this.cardGroups[0].getChildAt(this.lastPlayedCard).x
            icon.y = this.cardGroups[0].getChildAt(this.lastPlayedCard).y + 20;
            // 给出过的牌增加标记
            this.cardGroups[0].addChild(icon);
        } else {
            // 提示失败
            let toast = new Toast("扣牌不符合规则！")
            toast.show(this, 500, 300);
            console.log("出牌失败");
        }
    }

    private gamePlaying(data) {
        let resp = data.response;
        let info = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(egret.Base64Util.decode(resp.data))));
        if (resp.code == 0) {
            console.log(info);
            let playSeat = info.curr_playing_seat;
            let cards = info.curr_cards;
            let lastCard = info.last_card
            let isHead = info.last_is_head
            this.showOnGamePlaying(playSeat, cards, lastCard, isHead);
        }
    }

    private showOnGamePlaying(seat, cards, lastCard: Card, isHead: boolean) {
        let dis = Global.Instance.roomInfo.currSeat;
        let playSeat = (seat - dis + 4) % 4;
        for (let i = 0; i < 4; ++i) {
            if (i == playSeat) {
                this.playingArrows[i].visible = true;
            } else {
                this.playingArrows[i].visible = false;
            }
        }
        if (seat == Global.Instance.roomInfo.currSeat) {
            this.playButton.visible = true;
            this.disableButton.visible = true;
        } else {
            this.playButton.visible = false;
            this.disableButton.visible = false;
            this.headButton.visible = false;
            this.tailButton.visible = false;
        }

        if (cards == null) {
            return
        }

        console.log(cards);
        console.log((cards as Array<Card>).length);
        console.log(this.tableCards.length);
        let currCards = cards as Array<Card>

        if (currCards.length > this.tableCards.length) {
            // 1. 判断在头部/尾部增加
            let currRotation = 0;
            if (currCards.length == 1) {
                // 只有一个
                if (currCards[0].head != currCards[0].tail) {
                    currRotation = -90;
                }
                this.cardRotations.push(currRotation);
            } else if (!isHead) {
                // 在尾部增加了
                let len = currCards.length
                if (currCards[len - 1].head != currCards[len - 1].tail) {
                    if (currCards[len - 1].head == lastCard.tail) {
                        currRotation = 90;
                    } else if (currCards[len - 1].tail == lastCard.tail) {
                        currRotation = -90;
                    }
                }
                this.cardRotations.push(currRotation);
                console.log("pushed rotation: ", currRotation);
            } else {
                // 在头部增加
                // 2. 判断是否需要旋转(横牌/竖牌)
                if (currCards[0].head != currCards[0].tail) {
                    if (currCards[0].head == lastCard.head) {
                        currRotation = -90;
                    } else if (currCards[0].tail == lastCard.head) {
                        currRotation = 90;
                    }
                }
                this.cardRotations.splice(0, 0, currRotation);
                console.log("pushed rotation on head:", currRotation);
            }
            this.tableCardGroup.clear();
            console.log("rotations: ", this.cardRotations)
            for (let i = 0; i < cards.length; ++i) {
                this.tableCardGroup.addCard(cards[i], this.cardRotations[i]);
            }
            this.tableCards = cards;
        }
    }

    private showFinish(data) {
        let resp = data.response;
        let info = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(egret.Base64Util.decode(resp.data))));
        let scores = info.scores;
        let cards = info.cards_on_finish
        let finish = new FinishBoard();
        finish.verticalCenter = 0;
        finish.horizontalCenter = 0;
        finish.width = 600;
        finish.height = 300;
        finish.closeHandler = () => {
            this.removeChild(finish);
            this.readyButton.visible = true;
            this.removeChild(this.cardGroups[0]);
            this.tableCards = new Array<Card>(0);
            for (let i = 0; i < 4; ++i) {
                this.playingArrows[i].visible = false;
                this.readyIcons[i].visible = false;
            }
            this.playButton.visible = false;
            this.disableButton.visible = false;
            this.headButton.visible = false;
            this.tailButton.visible = false
            this.cardRotations = new Array<number>(0)
            this.tableCardGroup.clear();
            this.leaveButton.visible = true;
        }
        this.addChild(finish);
        console.log(info)
        for (let i = 0; i < 4; ++i) {
            finish.addScore(scores[i].seat, scores[i].score, cards[i].played_cards, cards[i].disabled_cards, cards[i].hand_cards);
        }
    }
}