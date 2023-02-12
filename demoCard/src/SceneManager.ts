class SceneManager {

    private static _manager: SceneManager;

    public static get Instance() {
        if (SceneManager._manager == null) {
            SceneManager._manager = new SceneManager();
        }
        return SceneManager._manager;
    }

    public constructor() {
    }

    public rootLayer: eui.UILayer;//起始场景
    private currentScene;//需要显示的场景
    private pop_scene;//弹出场景层
    //切换场景
    public changeScene(s) {
        if (this.currentScene) {
            console.log(this.currentScene)
            this.rootLayer.removeChild(this.currentScene);
            console.log("remove:" + this.currentScene)
            this.currentScene = null;
        }
        this.rootLayer.addChild(s);
        this.currentScene = s;
        console.log("add:" + this.currentScene)
    }

    //弹出场景层
    public pushScene(s) {
        this.popScene();
        if (!this.pop_scene) {
            this.rootLayer.addChild(s);
            this.pop_scene = s;
        }
    }
    //关闭场景层
    public popScene() {
        if (this.pop_scene) {
            this.rootLayer.removeChild(this.pop_scene);
            this.pop_scene = null;
        }
    }

}