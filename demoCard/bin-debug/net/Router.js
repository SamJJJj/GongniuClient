var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Router = (function () {
    function Router() {
    }
    Router.genJsonRequest = function (cmd, data) {
        return JSON.stringify({
            "cmd": cmd,
            "data": data,
        });
    };
    Router.globalCallback = function (data) {
        var cmd = data.cmd;
        if (!this.cmd2Handler.hasOwnProperty(cmd)) {
            return;
        }
        console.log("cmd:" + cmd + " triggered");
        this.cmd2Handler[cmd].call(this.cmd2Obj[cmd], data);
    };
    Router.registerHandler = function (cmd, handler, thisObj) {
        this.cmd2Handler[cmd] = handler;
        this.cmd2Obj[cmd] = thisObj;
    };
    /// 命令
    Router.cmd = {
        Login: "login",
        CreateRoom: "create_room",
        JoinRoom: "join_room",
        LeaveRoom: "leave_room",
        PlayerReady: "player_ready",
        GetHandCards: "get_hand_cards",
        PlayCard: "play_card",
        DisableCard: "disable_card",
        CheckGetCards: "check_get_cards",
        NotifyRoomMemChange: "notify_room_mem_change",
        NotifyGameStart: "notify_game_start",
        NotifyGamePlaying: "notify_game_playing",
    };
    Router.cmd2Handler = {};
    Router.cmd2Obj = {};
    return Router;
}());
__reflect(Router.prototype, "Router");
