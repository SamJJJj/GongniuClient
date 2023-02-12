class Global {
    private static _manager: Global;

    public static get Instance() {
        if (Global._manager == null) {
            Global._manager = new Global();
        }
        return Global._manager;
    }

    constructor() {

    }

    public userInfo;

    public roomInfo = {
        roomId: "",
        masterId: "",
    };

    public setUserInfo(info) {
        console.log(info);
        this.userInfo = info;
    }

    public static createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}