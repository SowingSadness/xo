/// <reference path="core.ts" />
/// <reference path="battlefield.ts" />
/// <reference path="field.ts" />
"use strict";
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var XoApp = (function (_super) {
    __extends(XoApp, _super);
    function XoApp(container, width, height) {
        _super.call(this, container, width, height);
        var texture = PIXI.Texture.fromImage("static/image/wood.jpg");
        this.stage.addChild(new PIXI.Sprite(texture));
        this.turn = FieldX;
        this.fields = [];
    }
    XoApp.prototype.setActive = function (turn) {
        this.turn = turn;
        for (var i = 0; i < this.fields.length; i++) {
            if (this.fields[i] instanceof turn) {
                this.fields[i].setInteractive(true);
                continue;
            }
            this.fields[i].setInteractive(false);
        }
    };
    XoApp.prototype.addField = function (action) {
        this.addAction(action);
        this.fields.push(action);
    };
    XoApp.prototype.launch = function () {
        this.setActive(FieldX);
        _super.prototype.launch.call(this);
    };
    return XoApp;
})(PixiApp);
//# sourceMappingURL=app.js.map