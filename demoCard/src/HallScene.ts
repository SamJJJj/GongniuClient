class HallScene extends eui.Group {
    constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        Router.registerHandler(Router.cmd.CreateRoom, this.createRoomHandler, this);
        Router.registerHandler(Router.cmd.JoinRoom, this.joinRoomHandler, this);
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

    private group: eui.Group;
    private joinGroup: eui.Group;
    private editor: eui.EditableText;

    protected createChildren(): void {
        super.createChildren();

        let backgroud = Global.createBitmapByName("bg_png");
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        backgroud.width = stageW;
        backgroud.height = stageH;
        this.addChild(backgroud)

        this.group = new eui.Group();
        this.group.percentWidth = 100;
        this.group.percentHeight = 30;
        this.group.bottom = 50;

        let createButton = new eui.Image();
        createButton.source = RES.getRes("create_game_png");

        let joinButton = new eui.Image();
        joinButton.source = RES.getRes("add_game_png");

        this.group.addChild(createButton);
        createButton.addEventListener("touchTap", this.createRoomRequest, this);

        this.group.addChild(joinButton);
        joinButton.addEventListener("touchTap", this.joinRoom, this);

        let status = new StatusBar();
        // 加载头像图片(要换成服务端下发的)
        // status.loadImage("http://rongcloud-web.qiniudn.com/docs_demo_rongcloud_logo.png");
        status.loadImage(Global.Instance.userInfo.avatarUrl);
        // Global.Instance.userInfo.nickName
        status.x = 10;
        status.y = 10;
        this.addChild(status);

        let hlayout = new eui.HorizontalLayout();
        hlayout.gap = 100;
        this.group.layout = hlayout;
        hlayout.horizontalAlign = egret.HorizontalAlign.CENTER
        this.addChild(this.group)

        this.initJoinGroup()
        this.joinGroup.height = 400;
        this.joinGroup.width = 300;
        this.joinGroup.y = 250;
        this.joinGroup.anchorOffsetX = this.joinGroup.width / 2;
        this.joinGroup.x = stageW / 2;
        this.addChild(this.joinGroup)
    }

    private initJoinGroup() {
        this.joinGroup = new eui.Group();

        let background = new eui.Image();
        background.source = RES.getRes("input_png");
        background.width = 500;
        background.height = 100;
        background.top = 0;
        background.left = 0;
        this.joinGroup.addChild(background);

        this.editor = new eui.EditableText();
        this.editor.maxChars = 6;
        this.editor.textColor = 0x0099FF;
        this.editor.width = 500;
        this.editor.height = 100;
        this.editor.prompt = "请输入6位房间号";
        this.editor.top = background.top + 20;
        this.editor.left = background.left + 20;

        this.joinGroup.addChild(this.editor);

        let cancelButton = new eui.Image();
        cancelButton.source = RES.getRes("cancel_png");
        cancelButton.width = 100;
        cancelButton.height = 60;
        cancelButton.top = 100 + 50;

        let confirmButton = new eui.Image();
        confirmButton.source = RES.getRes("confirm_png");
        confirmButton.width = 100;
        confirmButton.height = 60;
        confirmButton.top = cancelButton.top;
        confirmButton.left = 200;

        confirmButton.addEventListener("touchTap", this.confirmJoinRoom, this);
        cancelButton.addEventListener("touchTap", this.cancelJoinRoom, this);
        this.joinGroup.addChild(confirmButton);
        this.joinGroup.addChild(cancelButton);
        this.joinGroup.visible = false;
    }

    private createRoomRequest() {
        let cmd = Router.cmd.CreateRoom;
        let req = Router.genJsonRequest(cmd, {
            "user_id": Global.Instance.userInfo.userId
        })
        WebUtil.default().send(req);
    }

    private createRoomHandler(data) {
        let resp = data.response;
        let info = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(egret.Base64Util.decode(resp.data))))
        if (resp.code == 0) {
            console.log(info)
            console.log("创建成功");
            // 获取roomId;
            // 切换到 room 场景
            Global.Instance.roomInfo.roomId = info.room_id;
            Global.Instance.roomInfo.players = [{
                user_info: {
                    nick_name: Global.Instance.userInfo.nickName,
                    avatar_url: "",
                },
                seat: 0,
                is_ready: false
            }]
            let game = new GameScene();
            game.width = this.stage.width;
            game.height = this.stage.height;
            SceneManager.Instance.changeScene(game);
        } else {
            let toast = new Toast("创建房间失败, 请重试")
            toast.show(this, 500, 300);
            // 展示错误信息，需要手动重试
        }
    }

    private joinRoom() {
        this.group.visible = false;
        this.joinGroup.visible = true;
    }

    private cancelJoinRoom() {
        this.group.visible = true;
        this.joinGroup.visible = false;
    }

    private confirmJoinRoom() {
        let reg = /^[\d]+$/
        let id = this.editor.text;
        if (id.length != 6) {
            // 位数不够提示
            let toast = new Toast("加入房间失败, 请重试")
            toast.show(this, 500, 300);
            console.log("加入房间失败");
            return
        } else if (!reg.test(id)) {
            // 不是全是数字提示
            let toast = new Toast("加入房间失败, 请重试")
            toast.show(this, 500, 300);
            console.log("加入房间失败");
            return
        }
        let cmd = Router.cmd.JoinRoom;
        let req = Router.genJsonRequest(cmd, {
            "user_id": Global.Instance.userInfo.userId,
            "room_id": id
        })
        Global.Instance.roomInfo.roomId = id;
        WebUtil.default().send(req);
    }

    private joinRoomHandler(data) {
        let resp = data.response;
        let info = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(egret.Base64Util.decode(resp.data))))
        if (resp.code == 0) {
            console.log(info)
            console.log("加入成功");
            // 切换到 room 场景
            let game = new GameScene();
            game.width = this.stage.width;
            game.height = this.stage.height;
            Global.Instance.roomInfo.currSeat = info.current_seat;
            Global.Instance.roomInfo.masterSeat = info.master_seat;
            Global.Instance.roomInfo.players = info.players;
            for (let i = 0; i < Global.Instance.roomInfo.players.length; ++i) {
                if (Global.Instance.roomInfo.players[i].seat == Global.Instance.roomInfo.currSeat) {
                    continue;
                }
                Global.Instance.roomInfo.players[i].user_info.nick_name = decodeURIComponent(Global.Instance.roomInfo.players[i].user_info.nick_name)
                console.log("decoded: ", decodeURIComponent(Global.Instance.roomInfo.players[i].user_info.nick_name));
            }
            SceneManager.Instance.changeScene(game);
        } else {
            let toast = new Toast("加入房间失败, 请重试")
            toast.show(this, 500, 300);
            console.log("加入房间失败");
        }
    }
}