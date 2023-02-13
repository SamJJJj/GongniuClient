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
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.cardGroups = new Array(4);
        _this.avartars = new Array(4);
        _this.readyIcons = new Array(4);
        _this.userNameLabels = new Array(4);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        Router.registerHandler(Router.cmd.NotifyRoomMemChange, _this.memberChangeHandler, _this);
        Router.registerHandler(Router.cmd.PlayerReady, _this.readyHandler, _this);
        return _this;
    }
    GameScene.prototype.onAddToStage = function (event) {
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
    GameScene.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        var backgroud = Global.createBitmapByName("bg_png");
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        backgroud.width = stageW;
        backgroud.height = stageH;
        this.addChild(backgroud);
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
        this.readyButton.addEventListener("touchTap", this.readyButtonHanler, this);
        this.addChild(this.readyButton);
        this.addAvatars();
        this.addReadyIcons();
        this.updateRoomMemberInfo();
    };
    GameScene.prototype.addAvatars = function () {
        var i = 0;
        var width = 80;
        var height = 80;
        for (i = 0; i < 4; ++i) {
            var avartar = new eui.Image();
            avartar.width = width;
            avartar.height = height;
            avartar.visible = false;
            this.avartars[i] = avartar;
        }
        // 0 代表自己 1 下家， 2 ...
        // 布局
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
            if (i == 0) {
                this.avartars[i].visible = true;
                this.loadImageForSeat("http://rongcloud-web.qiniudn.com/docs_demo_rongcloud_logo.png", i);
            }
        }
    };
    GameScene.prototype.addReadyIcons = function () {
        var i = 0;
        var width = 100;
        var height = 60;
        for (i = 0; i < 4; ++i) {
            var icon = new eui.Image();
            icon.width = width;
            icon.height = height;
            icon.visible = false;
            icon.source = RES.getRes("ready_icon_png");
            icon.rotation = -(i * 90);
            this.readyIcons[i] = icon;
        }
        // 布局
        // 0 代表自己 1 下家， 2 ...
        // 布局
        this.readyIcons[0].verticalCenter = 250;
        this.readyIcons[0].horizontalCenter = 50;
        this.readyIcons[1].verticalCenter = -50;
        this.readyIcons[1].horizontalCenter = 450;
        this.readyIcons[2].verticalCenter = -250;
        this.readyIcons[2].horizontalCenter = -50;
        this.readyIcons[3].verticalCenter = 50;
        this.readyIcons[3].horizontalCenter = -450;
        for (i = 0; i < 4; ++i) {
            this.addChild(this.readyIcons[i]);
        }
    };
    GameScene.prototype.addNameLables = function () {
        var i = 0;
        for (i = 0; i < 4; ++i) {
            var label = new eui.Label();
            label.textColor = 0xFFFFFF;
            label.size = 20;
            label.visible = false;
            this.userNameLabels[i] = label;
        }
        this.userNameLabels[0].verticalCenter = 300;
        this.userNameLabels[0].horizontalCenter = 0;
        this.userNameLabels[1].verticalCenter = 50;
        this.userNameLabels[1].horizontalCenter = 450;
        this.userNameLabels[2].verticalCenter = -250;
        this.userNameLabels[2].horizontalCenter = 50;
        this.userNameLabels[3].verticalCenter = 50;
        this.userNameLabels[3].horizontalCenter = -450;
        for (i = 0; i < 4; ++i) {
            this.addChild(this.userNameLabels[i]);
        }
    };
    GameScene.prototype.updateRoomMemberInfo = function () {
        var dis = Global.Instance.roomInfo.currSeat;
        for (var _i = 0, _a = Global.Instance.roomInfo.players; _i < _a.length; _i++) {
            var player = _a[_i];
            var seat = (player.seat - dis + 4) % 4;
            this.avartars[seat].visible = true;
            // this.loadImageForSeat(player.user_info.avatar_url, seat);
            this.loadImageForSeat("http://rongcloud-web.qiniudn.com/docs_demo_rongcloud_logo.png", seat);
            if (player.is_ready) {
                this.readyIcons[seat].visible = true;
            }
            this.userNameLabels[seat].text = player.user_info.nick_name;
        }
    };
    GameScene.prototype.memberChangeHandler = function (data) {
        var resp = data.response;
        var info = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(egret.Base64Util.decode(resp.data))));
        if (resp.code == 0) {
            console.log(info);
            console.log("member changed");
            // 切换到 room 场景
            Global.Instance.roomInfo.masterSeat = info.master_seat;
            Global.Instance.roomInfo.players = info.players;
        }
        this.updateRoomMemberInfo();
    };
    GameScene.prototype.loadImageForSeat = function (url, i) {
        this.loadImage(url, this.avartars[i]);
    };
    // 加载头像
    GameScene.prototype.loadImage = function (url, image) {
        var loader = new egret.ImageLoader();
        loader.crossOrigin = "anonymous";
        loader.load(url);
        loader.once(egret.Event.COMPLETE, function (evt) {
            console.log("图片加载成功" + url);
            var texture = new egret.Texture();
            texture.bitmapData = evt.currentTarget.data;
            image.source = texture;
        }, this);
    };
    GameScene.prototype.readyButtonHanler = function () {
        var cmd = Router.cmd.PlayerReady;
        var req = Router.genJsonRequest(cmd, {
            "user_id": Global.Instance.userInfo.userId,
            "room_id": Global.Instance.roomInfo.roomId,
        });
        WebUtil.default().send(req);
    };
    GameScene.prototype.readyHandler = function (data) {
        var resp = data.response;
        var info = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(egret.Base64Util.decode(resp.data))));
        if (resp.code == 0) {
            console.log(info);
            this.readyButton.visible = false;
            this.readyIcons[0].visible = true;
        }
        else {
            // 准备请求失败，show tips
            console.log("ready request error");
        }
    };
    return GameScene;
}(eui.Group));
__reflect(GameScene.prototype, "GameScene");
