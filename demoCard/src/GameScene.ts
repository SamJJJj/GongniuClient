class GameScene extends eui.Group {
    constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        Router.registerHandler(Router.cmd.NotifyRoomMemChange, this.memberChangeHandler, this);
        Router.registerHandler(Router.cmd.PlayerReady, this.readyHandler, this);
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
    }

    private readyButton: eui.Image;

    private cardGroups: eui.Group[] = new Array<eui.Group>(4);
    private avartars: eui.Image[] = new Array<eui.Image>(4);
    private readyIcons: eui.Image[] = new Array<eui.Image>(4);
    private userNameLabels: eui.Label[] = new Array<eui.Label>(4);

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
        this.readyButton.verticalCenter = 160;
        this.readyButton.addEventListener("touchTap", this.readyButtonHanler, this);

        this.addChild(this.readyButton);
        this.addAvatars();
        this.addReadyIcons();
        this.addNameLables();
        this.updateRoomMemberInfo();
    }

    private addAvatars() {
        let i = 0;
        let width = 80;
        let height = 80;
        for (i = 0; i < 4; ++i) {
            let avartar = new eui.Image();
            avartar.width = width;
            avartar.height = height;
            avartar.visible = false;
            this.avartars[i] = avartar;
        }
        // 0 代表自己 1 下家， 2 ...
        // 布局
        this.avartars[0].verticalCenter = 250;
        this.avartars[0].horizontalCenter = 0;
        this.avartars[1].verticalCenter = 0;
        this.avartars[1].horizontalCenter = 450;
        this.avartars[2].verticalCenter = -250;
        this.avartars[2].horizontalCenter = 0;
        this.avartars[3].verticalCenter = 0;
        this.avartars[3].horizontalCenter = -450;

        for (i = 0; i < 4; ++i) {
            this.addChild(this.avartars[i]);
            if (i == 0) {
                this.avartars[i].visible = true;
                this.loadImageForSeat("http://rongcloud-web.qiniudn.com/docs_demo_rongcloud_logo.png", i);
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
        this.readyIcons[0].verticalCenter = 250;
        this.readyIcons[0].horizontalCenter = 100;
        this.readyIcons[1].verticalCenter = -100;
        this.readyIcons[1].horizontalCenter = 450;
        this.readyIcons[2].verticalCenter = -250;
        this.readyIcons[2].horizontalCenter = -100;
        this.readyIcons[3].verticalCenter = 100;
        this.readyIcons[3].horizontalCenter = -450;

        for (i = 0; i < 4; ++i) {
            this.addChild(this.readyIcons[i]);
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
        this.userNameLabels[0].verticalCenter = 300;
        this.userNameLabels[0].horizontalCenter = 0;
        this.userNameLabels[1].verticalCenter = 50;
        this.userNameLabels[1].horizontalCenter = 450;
        this.userNameLabels[2].verticalCenter = -250;
        this.userNameLabels[2].horizontalCenter = 50;
        this.userNameLabels[3].verticalCenter = 50;
        this.userNameLabels[3].horizontalCenter = -450;

        for (i = 0; i < 4; ++i) {
            this.addChild(this.userNameLabels[i]);
        }
    }

    private updateRoomMemberInfo() {
        let dis = Global.Instance.roomInfo.currSeat;
        for (let player of Global.Instance.roomInfo.players) {
            let seat = (player.seat - dis + 4) % 4;
            this.avartars[seat].visible = true;
            // this.loadImageForSeat(player.user_info.avatar_url, seat);
            this.loadImageForSeat("http://rongcloud-web.qiniudn.com/docs_demo_rongcloud_logo.png", seat);
            if (player.is_ready) {
                this.readyIcons[seat].visible = true;
            }
            this.userNameLabels[seat].visible = true;
            this.userNameLabels[seat].text = player.user_info.nick_name;
        }
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
        }
        this.updateRoomMemberInfo()
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
        }
    }
}