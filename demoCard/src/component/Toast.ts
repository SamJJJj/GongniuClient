class Toast extends egret.DisplayObjectContainer {
    private _bg: egret.Shape;
    private _text: egret.TextField;

    public constructor(text: string) {
        super();

        this._bg = new egret.Shape();
        this._bg.graphics.beginFill(0x000000, 0.7);
        this._bg.graphics.drawRoundRect(0, 0, 200, 50, 20);
        this._bg.graphics.endFill();
        this.addChild(this._bg);

        this._text = new egret.TextField();
        this._text.width = 200;
        this._text.height = 50;
        this._text.textColor = 0xffffff;
        this._text.textAlign = egret.HorizontalAlign.CENTER;
        this._text.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._text.text = text;
        this.addChild(this._text);
    }

    public show(parent: egret.DisplayObjectContainer, x: number, y: number): void {
        this.x = x;
        this.y = y;
        parent.addChild(this);
        setTimeout(() => {
            this.parent.removeChild(this);
        }, 2000);
    }
}