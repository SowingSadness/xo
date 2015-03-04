/// <reference path="core.ts" />
/// <reference path="field.ts" />
"use strict";

class Battlefield implements Action {
    private view: PIXI.DisplayObjectContainer;

    private left: number = 364;
    private top: number = 264;
    private width: number = 384;
    private height: number = 384;
    private itemWidth: number = 128;
    private itemHeight: number = 128;

    constructor(private setActiveFieldsCallback: Function) {
        this.view = new PIXI.DisplayObjectContainer();
        var texField = PIXI.Texture.fromImage("static/image/fieldB.png");

        var places = [];
        for (var x=0; x<3; x++) {
            for (var y=0; y<3; y++) {
                places.push(new PIXI.Point(this.left + x*this.itemWidth, this.top + y*this.itemHeight));
            }
        }

        for (var i=0; i < places.length; i++) {
            var field = new PIXI.Sprite(texField);
            field.anchor.x = 0.5;
            field.anchor.y = 0.5;
            field.position = places[i];
            this.view.addChild(field);
        }
    }

    getView(stage: PIXI.Stage) {
        return this.view;
    }

    step() {}

    isPointIn(point: PIXI.Point) {
        return (this.left - this.itemWidth / 2) < point.x && point.x < (this.left + this.width - this.itemWidth / 2) &&
            (this.top - this.itemHeight / 2) < point.y && point.y < (this.top + + this.height - this.itemHeight / 2);
    }

    setFieldPlace(field: Field) {
        var x = field.getPosition().x;
        var y = field.getPosition().y;
        for (var i=0; i<this.view.children.length; i++) {
            var child = <PIXI.Sprite> this.view.children[i];
            if (child.position.x - child.width / 2 > x) {
                continue;
            }
            if (child.position.x + child.width / 2 < x) {
                continue;
            }
            if (child.position.y - child.height / 2 > y) {
                continue;
            }
            if (child.position.y + child.height / 2 < y) {
                continue;
            }
            field.setPosition(child.position.x, child.position.y);
            break;
        }
        if (field instanceof FieldX) {
            this.setActiveFieldsCallback(FieldO);
        }
        if (field instanceof FieldO) {
            this.setActiveFieldsCallback(FieldX);
        }
    }
}