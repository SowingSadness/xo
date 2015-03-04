/// <reference path="core.ts" />
"use strict";

class MousePos implements Action {
    private view: PIXI.Text;
    private stage: PIXI.Stage;
    constructor() {
        this.view = new PIXI.Text("undefined", {
        font: "Courier NEW",
        fill: '#ffffff',
        strokeThickness: 0.5
    });
        this.view.position.x = 0;
        this.view.position.y = 0;
    }

    getView(stage: PIXI.Stage) {
        this.stage = stage;
        return this.view;
    }

    step() {
        var pos = this.stage.getMousePosition();
        this.view.setText("X: %x, Y: %y".replace(/%x/, pos.x.toString()).replace(/%y/, pos.y.toString()));
    }
}