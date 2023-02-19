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
        _this.playingArrows = new Array(4);
        _this.userNameLabels = new Array(4);
        _this.tableCards = new Array(0);
        _this.selectedIdx = -1;
        _this.lastPlayedCard = -1;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        Router.registerHandler(Router.cmd.NotifyRoomMemChange, _this.memberChangeHandler, _this);
        Router.registerHandler(Router.cmd.PlayerReady, _this.readyHandler, _this);
        Router.registerHandler(Router.cmd.NotifyGameStart, _this.gameStart, _this);
        Router.registerHandler(Router.cmd.GetHandCards, _this.getCardsHandler, _this);
        Router.registerHandler(Router.cmd.PlayCard, _this.playCardHandler, _this);
        Router.registerHandler(Router.cmd.DisableCard, _this.disableCardHandler, _this);
        Router.registerHandler(Router.cmd.NotifyGamePlaying, _this.gamePlaying, _this);
        Router.registerHandler(Router.cmd.NotifyGameFinished, _this.showFinish, _this);
        Router.registerHandler(Router.cmd.LeaveRoom, _this.leaveRoomHandler, _this);
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
                this.loadResource().catch(function (e) {
                    console.log(e);
                });
                return [2 /*return*/];
            });
        });
    };
    GameScene.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        loadingView = new LoadingUI();
                        return [4 /*yield*/, RES.loadConfig("resource/card.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("cards", 0, loadingView)];
                    case 2:
                        _a.sent();
                        console.log("load cards OK");
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
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
        this.readyButton.bottom = 100;
        this.readyButton.addEventListener("touchTap", this.readyButtonHanler, this);
        this.leaveButton = new eui.Image();
        this.leaveButton.source = RES.getRes("close");
        this.leaveButton.right = 0;
        this.leaveButton.top = 0;
        this.leaveButton.visible = false;
        this.leaveButton.addEventListener("touchTap", this.leaveHandler, this);
        this.addChild(this.readyButton);
        this.addAvatars();
        this.addReadyIcons();
        this.addNameLables();
        this.updateRoomMemberInfo();
        this.addTableCardGroup();
        this.addPlayArrows();
        this.addChild(this.leaveButton);
    };
    GameScene.prototype.addAvatars = function () {
        var i = 0;
        var width = 60;
        var height = 60;
        for (i = 0; i < 4; ++i) {
            var avartar = new eui.Image();
            avartar.width = width;
            avartar.height = height;
            avartar.visible = false;
            this.avartars[i] = avartar;
        }
        // 0 代表自己 1 下家， 2 ...
        // 布局
        // this.avartars[0].verticalCenter = 250;
        // this.avartars[0].horizontalCenter = 0;
        // this.avartars[1].verticalCenter = 0;
        // this.avartars[1].horizontalCenter = 450;
        // this.avartars[2].verticalCenter = -250;
        // this.avartars[2].horizontalCenter = 0;
        // this.avartars[3].verticalCenter = 0;
        // this.avartars[3].horizontalCenter = -450;
        this.avartars[0].bottom = 30;
        this.avartars[0].horizontalCenter = 0;
        this.avartars[1].verticalCenter = 0;
        this.avartars[1].right = 20;
        this.avartars[2].top = 20;
        this.avartars[2].horizontalCenter = 0;
        this.avartars[3].verticalCenter = 0;
        this.avartars[3].left = 20;
        for (i = 0; i < 4; ++i) {
            this.addChild(this.avartars[i]);
            if (i == 0) {
                this.avartars[i].visible = true;
                this.loadImageForSeat(Global.Instance.userInfo.avatarUrl, i);
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
        this.readyIcons[0].bottom = 30;
        this.readyIcons[0].horizontalCenter = 100;
        this.readyIcons[1].verticalCenter = -100;
        this.readyIcons[1].right = 20;
        this.readyIcons[2].top = 20;
        this.readyIcons[2].horizontalCenter = -100;
        this.readyIcons[3].verticalCenter = 100;
        this.readyIcons[3].left = 20;
        for (i = 0; i < 4; ++i) {
            this.addChild(this.readyIcons[i]);
        }
    };
    GameScene.prototype.addPlayArrows = function () {
        var i = 0;
        var width = 40;
        var height = 40;
        for (i = 0; i < 4; ++i) {
            var icon = new eui.Image();
            icon.width = width;
            icon.height = height;
            icon.visible = false;
            icon.source = RES.getRes("play_arrow");
            icon.rotation = -(i * 90);
            this.playingArrows[i] = icon;
            console.log("arrows initiated: i:", i, "icon:", icon);
        }
        this.playingArrows[0].bottom = 90;
        this.playingArrows[0].horizontalCenter = 0;
        this.playingArrows[1].verticalCenter = 0;
        this.playingArrows[1].right = 90;
        this.playingArrows[2].top = 90;
        this.playingArrows[2].horizontalCenter = 0;
        this.playingArrows[3].verticalCenter = 0;
        this.playingArrows[3].left = 90;
        for (i = 0; i < 4; ++i) {
            this.addChild(this.playingArrows[i]);
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
        this.userNameLabels[0].bottom = 0;
        this.userNameLabels[0].horizontalCenter = 0;
        this.userNameLabels[1].verticalCenter = 50;
        this.userNameLabels[1].right = 20;
        this.userNameLabels[2].top = 80;
        this.userNameLabels[2].horizontalCenter = 0;
        this.userNameLabels[3].verticalCenter = 50;
        this.userNameLabels[3].left = 20;
        for (i = 0; i < 4; ++i) {
            this.addChild(this.userNameLabels[i]);
        }
    };
    GameScene.prototype.updateRoomMemberInfo = function () {
        var dis = Global.Instance.roomInfo.currSeat;
        this.leaveButton.visible = true;
        for (var seat = 0; seat < 4; ++seat) {
            this.avartars[seat].visible = false;
            this.readyIcons[seat].visible = false;
            this.userNameLabels[seat].visible = false;
        }
        for (var _i = 0, _a = Global.Instance.roomInfo.players; _i < _a.length; _i++) {
            var player = _a[_i];
            var seat = (player.seat - dis + 4) % 4;
            this.avartars[seat].visible = true;
            this.loadImageForSeat(player.user_info.avatar_url, seat);
            // this.loadImageForSeat("http://rongcloud-web.qiniudn.com/docs_demo_rongcloud_logo.png", seat);
            if (player.is_ready) {
                this.readyIcons[seat].visible = true;
            }
            this.userNameLabels[seat].text = player.user_info.nick_name;
            this.userNameLabels[seat].visible = true;
        }
    };
    GameScene.prototype.addTableCardGroup = function () {
        this.tableCardGroup = new TableCards();
        this.tableCardGroup.verticalCenter = 0;
        this.tableCardGroup.horizontalCenter = 0;
        this.tableCardGroup.width = 600;
        this.tableCardGroup.height = 250;
        this.addChild(this.tableCardGroup);
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
    GameScene.prototype.leaveHandler = function () {
        var cmd = Router.cmd.LeaveRoom;
        var req = Router.genJsonRequest(cmd, {
            "user_id": Global.Instance.userInfo.userId,
        });
        WebUtil.default().send(req);
    };
    GameScene.prototype.leaveRoomHandler = function (data) {
        var resp = data.response;
        // let info = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(egret.Base64Util.decode(resp.data))))
        if (resp.code == 0) {
            // 转到home scene
            var hall = new HallScene();
            hall.width = this.stage.width;
            hall.height = this.stage.height;
            // 置空房间信息
            // Global.Instance.roomInfo = null;
            SceneManager.Instance.pushScene(hall);
        }
        else {
            console.log("leave Room failed");
        }
    };
    GameScene.prototype.gameStart = function () {
        this.leaveButton.visible = false;
        this.readyButton.visible = false;
        for (var _i = 0, _a = this.readyIcons; _i < _a.length; _i++) {
            var icon = _a[_i];
            icon.visible = false;
        }
        // 获取手牌请求
        var cmd = Router.cmd.GetHandCards;
        var req = Router.genJsonRequest(cmd, {
            "user_id": Global.Instance.userInfo.userId,
            "room_id": Global.Instance.roomInfo.roomId,
            "seat_no": String(Global.Instance.roomInfo.currSeat),
        });
        WebUtil.default().send(req);
    };
    GameScene.prototype.getCardsHandler = function (data) {
        // 获取卡牌并显示
        var resp = data.response;
        var info = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(egret.Base64Util.decode(resp.data))));
        if (resp.code == 0) {
            this.cards = info.cards;
            // 展示卡牌， 发送确认收到请求
            this.showCards();
            this.checkGetCard();
        }
        else {
            console.log("get card error");
        }
    };
    GameScene.prototype.checkGetCard = function () {
        var cmd = Router.cmd.CheckGetCards;
        var req = Router.genJsonRequest(cmd, {
            "user_id": Global.Instance.userInfo.userId,
            "room_id": Global.Instance.roomInfo.roomId,
        });
        WebUtil.default().send(req);
    };
    GameScene.prototype.showCards = function () {
        var _this = this;
        var cards = new Array(6);
        var i = 0;
        for (var _i = 0, _a = this.cards; _i < _a.length; _i++) {
            var card = _a[_i];
            var image = new eui.Image();
            image.source = RES.getRes("card_" + card.head + "_" + card.tail);
            image.height = 100;
            image.width = 40;
            image.addEventListener("touchTap", function (e) {
                var i = 0;
                for (var _i = 0, cards_1 = cards; _i < cards_1.length; _i++) {
                    var card_1 = cards_1[_i];
                    if (e.target == card_1) {
                        break;
                    }
                    ++i;
                }
                console.log(e.target);
                console.log(i);
                _this.selectedIdx = i;
            }, this);
            cards[i++] = image;
        }
        var initleft = 0;
        var group = new eui.Group();
        group.left = 300;
        group.top = 430;
        for (var _b = 0, cards_2 = cards; _b < cards_2.length; _b++) {
            var card = cards_2[_b];
            group.addChild(card);
            card.left = initleft;
            card.top = 0;
            initleft += 50;
        }
        this.addChild(group);
        this.playButton = new eui.Image();
        this.playButton.source = RES.getRes("play_card");
        this.playButton.top = 530;
        this.playButton.left = 300;
        this.playButton.width = 80;
        this.playButton.height = 80;
        this.playButton.visible = false;
        this.addChild(this.playButton);
        this.playButton.addEventListener("touchTap", this.playButtonHandler, this);
        this.disableButton = new eui.Image();
        this.disableButton.source = RES.getRes("disable_card");
        this.disableButton.top = 530;
        this.disableButton.left = 400;
        this.disableButton.width = 80;
        this.disableButton.height = 80;
        this.disableButton.visible = false;
        this.addChild(this.disableButton);
        this.disableButton.addEventListener("touchTap", this.disableButtonHandler, this);
        this.cardGroups[0] = group;
    };
    GameScene.prototype.playButtonHandler = function () {
        if (this.selectedIdx == -1) {
            console.log("no selected card");
            return;
        }
        var cmd = Router.cmd.PlayCard;
        this.lastPlayedCard = this.selectedIdx;
        var req = Router.genJsonRequest(cmd, {
            "user_id": Global.Instance.userInfo.userId,
            "room_id": Global.Instance.roomInfo.roomId,
            "seat": Global.Instance.roomInfo.currSeat,
            "card": this.cards[this.selectedIdx],
        });
        WebUtil.default().send(req);
    };
    GameScene.prototype.playCardHandler = function (data) {
        var resp = data.response;
        var info = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(egret.Base64Util.decode(resp.data))));
        if (resp.code == 0) {
            var icon = new eui.Image();
            icon.source = RES.getRes("play_card");
            // icon.alpha = 0.8;
            icon.width = 40;
            icon.height = 40;
            icon.x = this.cardGroups[0].getChildAt(this.lastPlayedCard).x;
            icon.y = this.cardGroups[0].getChildAt(this.lastPlayedCard).y + 20;
            // 给出过的牌增加标记
            this.cardGroups[0].addChild(icon);
        }
        else {
            // 提示失败
            console.log("出牌失败");
        }
    };
    GameScene.prototype.disableButtonHandler = function () {
        if (this.selectedIdx == -1) {
            console.log("no selected card");
            return;
        }
        var cmd = Router.cmd.DisableCard;
        this.lastPlayedCard = this.selectedIdx;
        var req = Router.genJsonRequest(cmd, {
            "user_id": Global.Instance.userInfo.userId,
            "room_id": Global.Instance.roomInfo.roomId,
            "seat": Global.Instance.roomInfo.currSeat,
            "card": this.cards[this.selectedIdx],
        });
        WebUtil.default().send(req);
    };
    GameScene.prototype.disableCardHandler = function (data) {
        var resp = data.response;
        var info = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(egret.Base64Util.decode(resp.data))));
        if (resp.code == 0) {
            var icon = new eui.Image();
            icon.source = RES.getRes("disable_card");
            // icon.alpha = 0.8;
            icon.width = 40;
            icon.height = 40;
            icon.x = this.cardGroups[0].getChildAt(this.lastPlayedCard).x;
            icon.y = this.cardGroups[0].getChildAt(this.lastPlayedCard).y;
            // 给出过的牌增加标记
            this.cardGroups[0].addChild(icon);
        }
        else {
            // 提示失败
            console.log("出牌失败");
        }
    };
    GameScene.prototype.gamePlaying = function (data) {
        var resp = data.response;
        var info = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(egret.Base64Util.decode(resp.data))));
        if (resp.code == 0) {
            console.log(info);
            var playSeat = info.curr_playing_seat;
            var cards = info.curr_cards;
            this.showOnGamePlaying(playSeat, cards);
        }
    };
    GameScene.prototype.showOnGamePlaying = function (seat, cards) {
        var dis = Global.Instance.roomInfo.currSeat;
        var playSeat = (seat - dis + 4) % 4;
        for (var i = 0; i < 4; ++i) {
            if (i == playSeat) {
                this.playingArrows[i].visible = true;
            }
            else {
                this.playingArrows[i].visible = false;
            }
        }
        if (seat == Global.Instance.roomInfo.currSeat) {
            this.playButton.visible = true;
            this.disableButton.visible = true;
        }
        else {
            this.playButton.visible = false;
            this.disableButton.visible = false;
        }
        if (cards == null) {
            return;
        }
        console.log(cards);
        console.log(cards.length);
        console.log(this.tableCards.length);
        if (cards.length > this.tableCards.length) {
            for (var i = this.tableCards.length; i < cards.length; ++i) {
                console.log("i: " + i);
                this.tableCardGroup.addCard(cards[i]);
            }
            this.tableCards = cards;
        }
    };
    GameScene.prototype.showFinish = function (data) {
        var _this = this;
        var resp = data.response;
        var info = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(egret.Base64Util.decode(resp.data))));
        var scores = info.scores;
        var finish = new FinishBoard();
        finish.verticalCenter = 0;
        finish.horizontalCenter = 0;
        finish.width = 600;
        finish.height = 300;
        finish.closeHandler = function () {
            _this.removeChild(finish);
            _this.readyButton.visible = true;
            _this.removeChild(_this.cardGroups[0]);
            _this.tableCards = new Array(0);
            for (var i = 0; i < 4; ++i) {
                _this.playingArrows[i].visible = false;
                _this.readyIcons[i].visible = false;
            }
            _this.playButton.visible = false;
            _this.disableButton.visible = false;
            _this.tableCardGroup.clear();
            _this.leaveButton.visible = true;
            // for (let i = 0; i < 4; ++i) {
            //     this.removeChild(this.cardGroups[i]);
            // }
        };
        this.addChild(finish);
        for (var _i = 0, scores_1 = scores; _i < scores_1.length; _i++) {
            var score = scores_1[_i];
            finish.addScore(score.seat, score.score);
        }
    };
    return GameScene;
}(eui.Group));
__reflect(GameScene.prototype, "GameScene");
