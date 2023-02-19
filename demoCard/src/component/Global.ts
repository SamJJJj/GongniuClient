type UserInfo = {
    nick_name: string;
    avatar_url: string;
}

type CurrUserInfo = {
    nickName: string;
    avatarUrl: string;
    userId: string;
}

type PlayerInfo = {
    user_info: UserInfo;
    seat: number;
    is_ready: boolean;
}

type RoomInfo = {
    roomId: string,
    masterSeat: number;
    currSeat: number;
    players: PlayerInfo[];
}

class Global {
    private static _manager: Global;

    public static get Instance() {
        if (Global._manager == null) {
            Global._manager = new Global();
        }
        return Global._manager;
    }

    constructor() {
        this.roomInfo = { roomId: '0', currSeat: 0, masterSeat: 0, players: [] };
        this.userInfo = { nickName: "test" + this.randomString(3), userId: "123" + this.randomString(6), avatarUrl: "" }
    }

    private randomString(length) {
        var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var result = '';
        for (var i = length; i > 0; --i)
            result += str[Math.floor(Math.random() * str.length)];
        return result;
    }

    public userInfo: CurrUserInfo;

    public roomInfo: RoomInfo;

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