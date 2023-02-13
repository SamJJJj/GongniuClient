type UserInfo = {
    nick_name: string;
    avatar_url: string;
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
    }

    public userInfo;

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