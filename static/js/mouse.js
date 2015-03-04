/// <reference path="core.ts" />
"use strict";
var MousePos = (function () {
    function MousePos() {
        this.view = new PIXI.Text("undefined", {
            font: "Courier NEW",
            fill: '#ffffff',
            strokeThickness: 0.5
        });
        this.view.position.x = 0;
        this.view.position.y = 0;
    }
    MousePos.prototype.getView = function (stage) {
        this.stage = stage;
        return this.view;
    };
    MousePos.prototype.step = function () {
        var pos = this.stage.getMousePosition();
        this.view.setText("X: %x, Y: %y".replace(/%x/, pos.x.toString()).replace(/%y/, pos.y.toString()));
    };
    return MousePos;
})();
//# sourceMappingURL=mouse.js.map