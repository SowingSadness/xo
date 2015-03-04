/// <reference path="core.ts" />
/// <reference path="field.ts" />
"use strict";
var Battlefield = (function () {
    function Battlefield(setActiveFieldsCallback) {
        this.setActiveFieldsCallback = setActiveFieldsCallback;
        this.left = 364;
        this.top = 264;
        this.width = 384;
        this.height = 384;
        this.itemWidth = 128;
        this.itemHeight = 128;
        this.view = new PIXI.DisplayObjectContainer();
        var texField = PIXI.Texture.fromImage("static/image/fieldB.png");
        var places = [];
        for (var x = 0; x < 3; x++) {
            for (var y = 0; y < 3; y++) {
                places.push(new PIXI.Point(this.left + x * this.itemWidth, this.top + y * this.itemHeight));
            }
        }
        for (var i = 0; i < places.length; i++) {
            var field = new PIXI.Sprite(texField);
            field.anchor.x = 0.5;
            field.anchor.y = 0.5;
            field.position = places[i];
            this.view.addChild(field);
        }
    }
    Battlefield.prototype.getView = function (stage) {
        return this.view;
    };
    Battlefield.prototype.step = function () {
    };
    Battlefield.prototype.isPointIn = function (point) {
        return (this.left - this.itemWidth / 2) < point.x && point.x < (this.left + this.width - this.itemWidth / 2) && (this.top - this.itemHeight / 2) < point.y && point.y < (this.top + +this.height - this.itemHeight / 2);
    };
    Battlefield.prototype.setFieldPlace = function (field) {
        var x = field.getPosition().x;
        var y = field.getPosition().y;
        for (var i = 0; i < this.view.children.length; i++) {
            var child = this.view.children[i];
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
    };
    return Battlefield;
})();
//# sourceMappingURL=battlefield.js.map