class GameScene extends eui.Group {
    constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
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

        this.addChild(this.readyButton);
        this.addAvatars();
    }

    private addAvatars() {
        let i = 0;
        let width = 80;
        let height = 80;
        for (i = 0; i < 4; ++i) {
            let avartar = new eui.Image();
            avartar.width = width;
            avartar.height = height
            this.avartars[i] = avartar;
        }
        // 0 代表自己 1 下家， 2 ...
        // 布局
        let stageW = this.stage.width;
        let stageH = this.stage.height;
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
            // 加载其他座位的信息;
            this.loadImageForSeat("http://rongcloud-web.qiniudn.com/docs_demo_rongcloud_logo.png", i);
        }
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
}