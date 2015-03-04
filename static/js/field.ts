/// <reference path="core.ts" />
/// <reference path="battlefield.ts" />
"use strict";

class Field implements Action {
    private view: PIXI.Sprite;
    private dragging: boolean;
    private data: PIXI.InteractionData;

    constructor(private drop_area: Battlefield, start_pos: PIXI.Point) {
        var texture = PIXI.Texture.fromImage(this.getPicture());
        this.view = new PIXI.Sprite(texture);
        this.view.anchor.x = 0.5;
        this.view.anchor.y = 0.5;
        this.view.position = start_pos;

        this.attacheMove();
    }

    getView(stage: PIXI.Stage) {
        return this.view;
    }

    step() {}

    private attacheMove() {
        var begin_position;
        this.view.interactive = true;
        this.view.buttonMode = true;
        this.view.mousedown = this.view.touchstart = (data) => {
            data.originalEvent.preventDefault();

            // store a reference to the data
            // The reason for this is because of multitouch
            // we want to track the movement of this particular touch
            this.data = data;
            this.dragging = true;
            begin_position = this.view.position.clone();
        };

        this.view.mousemove = this.view.touchmove = (data) => {
            if(!this.dragging) {
                return;
            }
            var newPosition = this.data.getLocalPosition(this.view.parent);
            this.view.position.x = newPosition.x;
            this.view.position.y = newPosition.y;
        }

        this.view.mouseup = this.view.mouseupoutside = this.view.touchend = this.view.touchendoutside = (data) => {
            this.dragging = false;
            // set the interaction data to null
            this.data = null;

            if (this.drop_area.isPointIn(this.view.position)) {
                this.drop_area.setFieldPlace(this);
                return;
            }
            this.view.position = begin_position;
        };
    }

    protected getPicture() {
        return "static/image/x.png";
    }

    setInteractive(interactive: boolean) {
        this.view.interactive = interactive;
        this.view.alpha = interactive ? 1 : 0.5;
    }

    getPosition() {
        return this.view.position;
    }

    setPosition(x: number, y: number) {
        this.view.position.x = x;
        this.view.position.y = y;
    }
}

class FieldX extends Field {
    protected getPicture() {
        return "static/image/pingX.png";
    }
}

class FieldO extends Field {
    protected getPicture() {
        return "static/image/pingO.png";
    }
}
