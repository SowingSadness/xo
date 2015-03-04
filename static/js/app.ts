/// <reference path="core.ts" />
/// <reference path="battlefield.ts" />
/// <reference path="field.ts" />
"use strict";

class XoApp extends PixiApp {
    private turn: Function;
    private fields: Field[];

    constructor(container, width, height) {
        super(container, width, height);
        var texture = PIXI.Texture.fromImage("static/image/wood.jpg");
        this.stage.addChild(new PIXI.Sprite(texture));
        this.turn = FieldX;
        this.fields = [];
    }

    setActive(turn: Function) {
        this.turn = turn;
        for (var i=0; i<this.fields.length; i++) {
            if (this.fields[i] instanceof turn) {
                this.fields[i].setInteractive(true);
                continue;
            }
            this.fields[i].setInteractive(false);
        }
    }

    addField(action: Field) {
        this.addAction(action);
        this.fields.push(action);
    }

    launch() {
        this.setActive(FieldX);
        super.launch();
    }
}