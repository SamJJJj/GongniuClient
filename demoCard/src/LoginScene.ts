class LoginScene extends eui.Group {
    constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        Router.registerHandler(Router.cmd.Login, this.loginHandler, this);
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

    private editor: eui.EditableText;

    protected createChildren(): void {
        super.createChildren()
        let bg = this.createBitmapByName("bg_png");
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        bg.width = stageW;
        bg.height = stageH;

        let button = this.createBitmapByName("login_png");
        button.width = 300;
        button.height = 100;

        button.anchorOffsetX = button.width / 2;
        button.x = stageW / 2;
        button.y = 400;
        button.touchEnabled = true
        button.addEventListener("touchTap", this.login, this)

        let background = new eui.Image();
        background.source = RES.getRes("input_png");
        background.width = 500;
        background.height = 100;
        background.top = 300;
        background.left = stageW / 2 - 150;

        this.editor = new eui.EditableText();
        this.editor.maxChars = 12;
        this.editor.textColor = 0x0099FF;
        this.editor.width = 500;
        this.editor.height = 100;
        this.editor.prompt = "请输入昵称";
        this.editor.top = background.top + 20;
        this.editor.left = background.left + 20;

        if (egret.localStorage.getItem('nickName') != null) {
            this.editor.visible = false;
            background.visible = false;
            console.log("storage getted");
        }

        this.addChild(bg)
        this.addChild(background)
        this.addChild(this.editor);
        this.addChild(button);
    }

    private login() {
        let name = this.editor.text;
        if (egret.localStorage.getItem('nickName') != null) {
            name = egret.localStorage.getItem('nickName')
        }
        if (egret.localStorage.getItem('userId') != null) {
            Global.Instance.userInfo.userId = egret.localStorage.getItem('userId')
        }
        if (name.length == 0) {
            let toast = new Toast("昵称不能为空");
            toast.show(this, 500, 200);
            return
        }
        Global.Instance.userInfo.nickName = name;
        let loginCmd = Router.cmd.Login
        console.log(Global.Instance.userInfo)
        let req = Router.genJsonRequest(loginCmd, {
            "user_id": Global.Instance.userInfo.userId,
            "account_id": "123456",
            "nick_name": encodeURIComponent(Global.Instance.userInfo.nickName.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, "")),
            "avatar_url": Global.Instance.userInfo.avatarUrl
        });
        WebUtil.default().send(req);
    }

    private loginHandler(data) {
        let resp = data.response;
        let info = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(egret.Base64Util.decode(resp.data))))
        if (resp.code == 0) {
            console.log(info)
            console.log("登录成功");
            let hall = new HallScene();
            hall.width = this.stage.width
            hall.height = this.stage.height
            egret.localStorage.setItem('nickName', Global.Instance.userInfo.nickName);
            egret.localStorage.setItem('userId', Global.Instance.userInfo.userId);
            console.log("storage setted: ", Global.Instance.userInfo.nickName, " ", Global.Instance.userInfo.userId)
            SceneManager.Instance.changeScene(hall)
        } else {
            if (this.editor.visible) {
                let toast = new Toast("昵称已存在")
                toast.show(this, 500, 300);
            } else {
                let toast = new Toast("登录失败, 请重试")
                toast.show(this, 500, 300);
            }
            console.log("登录失败")
        }
    }

    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}