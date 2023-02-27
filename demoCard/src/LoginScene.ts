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

    protected createChildren(): void {
        super.createChildren()
        let backgroud = this.createBitmapByName("bg_png");
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        backgroud.width = stageW;
        backgroud.height = stageH;

        let button = this.createBitmapByName("login_png");
        button.width = 300;
        button.height = 100;

        button.anchorOffsetX = button.width / 2;
        button.x = stageW / 2;
        button.y = 300;
        button.touchEnabled = true
        button.addEventListener("touchTap", this.login, this)

        this.addChild(backgroud);
        this.addChild(button);
    }

    private login() {
        let loginCmd = Router.cmd.Login
        console.log(Global.Instance.userInfo)
        let req = Router.genJsonRequest(loginCmd, {
            "user_id": Global.Instance.userInfo.userId,
            "account_id": "123456",
            "nick_name": Global.Instance.userInfo.nickName,
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
            SceneManager.Instance.changeScene(hall)
        } else {
            let toast = new Toast("登录失败, 请重试")
            toast.show(this, 500, 300);
            console.log("登录失败")
            // 展示错误信息，重试
        }
    }

    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}