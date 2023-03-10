class StatusBar extends eui.Group {

    private avatar: eui.Image;
    private nickName: eui.Label;

    protected createChildren(): void {
        super.createChildren();
        let avartarFrame = new eui.Image();
        avartarFrame.source = RES.getRes("avartar_frame_png");
        avartarFrame.top = 10;
        avartarFrame.left = 10;
        avartarFrame.height = 80;
        avartarFrame.width = 80;
        this.addChild(avartarFrame)

        this.avatar = new eui.Image();
        this.avatar.top = 15;
        this.avatar.left = 15;
        this.avatar.width = 70;
        this.avatar.height = 70;
        this.addChild(this.avatar);

        this.nickName = new eui.Label();
        this.nickName.left = avartarFrame.width + 10;
        this.nickName.top = 20;
        this.nickName.size = 20;
        this.nickName.textColor = 0xFFFFFF;
        this.nickName.text = Global.Instance.userInfo.nickName;
        this.addChild(this.nickName)
    }

    public loadImage(url) {
        let loader = new egret.ImageLoader();
        loader.crossOrigin = "anonymous";
        loader.load(url);
        loader.once(egret.Event.COMPLETE, (evt: egret.Event) => {
            console.log("图片加载成功");
            let texture = new egret.Texture();
            texture.bitmapData = evt.currentTarget.data;
            this.avatar.source = texture;
        }, this)
    }
}