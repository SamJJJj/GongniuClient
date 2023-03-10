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
var LoginScene = (function (_super) {
    __extends(LoginScene, _super);
    function LoginScene() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        Router.registerHandler(Router.cmd.Login, _this.loginHandler, _this);
        return _this;
    }
    LoginScene.prototype.onAddToStage = function (event) {
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
    LoginScene.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        var backgroud = this.createBitmapByName("bg_png");
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        backgroud.width = stageW;
        backgroud.height = stageH;
        var button = this.createBitmapByName("login_png");
        button.width = 300;
        button.height = 100;
        button.anchorOffsetX = button.width / 2;
        button.x = stageW / 2;
        button.y = 400;
        button.touchEnabled = true;
        button.addEventListener("touchTap", this.login, this);
        var background = new eui.Image();
        background.source = RES.getRes("input_png");
        background.width = 500;
        background.height = 100;
        background.top = 300;
        background.left = stageW / 2 - 250;
        this.editor = new eui.EditableText();
        this.editor.maxChars = 12;
        this.editor.textColor = 0x0099FF;
        this.editor.width = 500;
        this.editor.height = 100;
        this.editor.prompt = "???????????????";
        this.editor.top = background.top + 20;
        this.editor.left = background.left + 20;
        this.addChild(backgroud);
        this.addChild(this.editor);
        this.addChild(button);
    };
    LoginScene.prototype.login = function () {
        if (this.editor.text.length == 0) {
            var toast = new Toast("??????????????????");
            toast.show(this, 300, 200);
            return;
        }
        Global.Instance.userInfo.nickName = this.editor.text;
        var loginCmd = Router.cmd.Login;
        console.log(Global.Instance.userInfo);
        var req = Router.genJsonRequest(loginCmd, {
            "user_id": Global.Instance.userInfo.userId,
            "account_id": "123456",
            "nick_name": encodeURIComponent(Global.Instance.userInfo.nickName.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, "")),
            "avatar_url": Global.Instance.userInfo.avatarUrl
        });
        WebUtil.default().send(req);
    };
    LoginScene.prototype.loginHandler = function (data) {
        var resp = data.response;
        var info = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(egret.Base64Util.decode(resp.data))));
        if (resp.code == 0) {
            console.log(info);
            console.log("????????????");
            var hall = new HallScene();
            hall.width = this.stage.width;
            hall.height = this.stage.height;
            SceneManager.Instance.changeScene(hall);
        }
        else {
            var toast = new Toast("????????????, ?????????");
            toast.show(this, 500, 300);
            console.log("????????????");
            // ???????????????????????????
        }
    };
    LoginScene.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return LoginScene;
}(eui.Group));
__reflect(LoginScene.prototype, "LoginScene");
