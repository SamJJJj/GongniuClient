//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {

    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器

        this.runGame().catch(e => {
            console.log(e);
        })
    }

    protected createGameScene(): void {
        SceneManager.Instance.rootLayer = this;
        let s1 = new LoginScene();
        //显示第一个场景
        SceneManager.Instance.changeScene(s1);
    }

    private async runGame() {
        await this.loadResource()
        // WebUtil.default().connect("ws://127.0.0.1:8090/ws")
        WebUtil.default().connect("ws://192.168.0.100:8090/ws")
        WebUtil.default().setReceiveCallback(Router.globalCallback, Router)
        await platform.login();
        console.log("login --- ");
        console.log(platform)
        let info = { nickName: "test" + this.randomString(3), userId: "123" + this.randomString(6) }
        Global.Instance.setUserInfo(info);
        var login = new LoginScene()
        login.width = this.stage.width
        login.height = this.stage.height
        SceneManager.Instance.rootLayer = this;
        console.log("entering login scene");
        SceneManager.Instance.changeScene(login)
    }

    private randomString(length) {
        var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var result = '';
        for (var i = length; i > 0; --i)
            result += str[Math.floor(Math.random() * str.length)];
        return result;
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            console.log("load OK")
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }
}