var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var HallScene = (function (_super) {
    __extends(HallScene, _super);
    function HallScene() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        Router.registerHandler(Router.cmd.CreateRoom, _this.createRoomHandler, _this);
        Router.registerHandler(Router.cmd.JoinRoom, _this.joinRoomHandler, _this);
        return _this;
    }
    HallScene.prototype.onAddToStage = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                egret.lifecycle.addLifecycleListener(function (context) {
                    // custom lifecycle plugin
                    context.onUpdate = function () {
                    };
                });
                egret.lifecycle.onPause = function () {
                    egret.ticker.pause();
                };
                egret.lifecycle.onResume = function () {
                    egret.ticker.resume();
                };
                return [2 /*return*/];
            });
        });
    };
    HallScene.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        var backgroud = Global.createBitmapByName("bg_png");
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        backgroud.width = stageW;
        backgroud.height = stageH;
        this.addChild(backgroud);
        this.group = new eui.Group();
        this.group.width = stageW;
        this.group.height = 300;
        this.group.y = 400;
        var createButton = new eui.Image();
        createButton.source = RES.getRes("create_game_png");
        var joinButton = new eui.Image();
        joinButton.source = RES.getRes("add_game_png");
        this.group.addChild(createButton);
        createButton.addEventListener("touchTap", this.createRoomRequest, this);
        this.group.addChild(joinButton);
        joinButton.addEventListener("touchTap", this.joinRoom, this);
        var status = new StatusBar();
        // 加载头像图片(要换成服务端下发的)
        status.loadImage("http://rongcloud-web.qiniudn.com/docs_demo_rongcloud_logo.png");
        // Global.Instance.userInfo.nickName
        status.x = 10;
        status.y = 10;
        this.addChild(status);
        var hlayout = new eui.HorizontalLayout();
        hlayout.gap = 100;
        this.group.layout = hlayout;
        hlayout.horizontalAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this.group);
        this.initJoinGroup();
        this.joinGroup.height = 400;
        this.joinGroup.width = 300;
        this.joinGroup.y = 250;
        this.joinGroup.anchorOffsetX = this.joinGroup.width / 2;
        this.joinGroup.x = stageW / 2;
        this.addChild(this.joinGroup);
    };
    HallScene.prototype.initJoinGroup = function () {
        this.joinGroup = new eui.Group();
        var background = new eui.Image();
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
        var confirmButton = new eui.Image();
        confirmButton.source = RES.getRes("confirm_png");
        confirmButton.width = 100;
        confirmButton.height = 60;
        confirmButton.top = 100 + 50;
        var cancelButton = new eui.Image();
        cancelButton.source = RES.getRes("cancel_png");
        cancelButton.width = 100;
        cancelButton.height = 60;
        cancelButton.top = confirmButton.top;
        cancelButton.left = 200;
        confirmButton.addEventListener("touchTap", this.confirmJoinRoom, this);
        cancelButton.addEventListener("touchTap", this.cancelJoinRoom, this);
        this.joinGroup.addChild(confirmButton);
        this.joinGroup.addChild(cancelButton);
        this.joinGroup.visible = false;
    };
    HallScene.prototype.createRoomRequest = function () {
        var cmd = Router.cmd.CreateRoom;
        var req = Router.genJsonRequest(cmd, {
            "user_id": Global.Instance.userInfo.userId
        });
        WebUtil.default().send(req);
    };
    HallScene.prototype.createRoomHandler = function (data) {
        var resp = data.response;
        var info = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(egret.Base64Util.decode(resp.data))));
        if (resp.code == 0) {
            console.log(info);
            console.log("创建成功");
            // 获取roomId;
            // 切换到 room 场景
            Global.Instance.roomInfo.roomId = info.room_id;
            Global.Instance.roomInfo.masterId = Global.Instance.userInfo.userId;
            var game = new GameScene();
            game.width = this.stage.width;
            game.height = this.stage.height;
            SceneManager.Instance.changeScene(game);
        }
        else {
            console.log("创建房间失败");
            // 展示错误信息，需要手动重试
        }
    };
    HallScene.prototype.joinRoom = function () {
        this.group.visible = false;
        this.joinGroup.visible = true;
    };
    HallScene.prototype.cancelJoinRoom = function () {
        this.group.visible = true;
        this.joinGroup.visible = false;
    };
    HallScene.prototype.confirmJoinRoom = function () {
        var reg = /^[\d]+$/;
        var id = this.editor.text;
        if (id.length != 6) {
            // 位数不够提示
            return;
        }
        else if (!reg.test(id)) {
            // 不是全是数字提示
            return;
        }
        var cmd = Router.cmd.JoinRoom;
        var req = Router.genJsonRequest(cmd, {
            "user_id": Main.userInfo.userId,
            "room_id": id
        });
        WebUtil.default().send(req);
    };
    HallScene.prototype.joinRoomHandler = function (data) {
        var resp = data.response;
        var info = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(egret.Base64Util.decode(resp.data))));
        if (resp.code == 0) {
            console.log(info);
            console.log("加入成功");
            // 获取roomId;
            // 切换到 room 场景
            // let game = new GameScene();
            // game.width = this.stage.width;
            // game.height = this.stage.height;
            // SceneManager.Instance.changeScene(game);
        }
        else {
            console.log("创建房间失败");
            // 展示错误信息，需要手动重试
        }
    };
    return HallScene;
}(eui.Group));
__reflect(HallScene.prototype, "HallScene");
