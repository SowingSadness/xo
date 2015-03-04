/// <reference path="core.ts" />
/// <reference path="battlefield.ts" />
"use strict";
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Field = (function () {
    function Field(drop_area, start_pos) {
        this.drop_area = drop_area;
        var texture = PIXI.Texture.fromImage(this.getPicture());
        this.view = new PIXI.Sprite(texture);
        this.view.anchor.x = 0.5;
        this.view.anchor.y = 0.5;
        this.view.position = start_pos;
        this.attacheMove();
    }
    Field.prototype.getView = function (stage) {
        return this.view;
    };
    Field.prototype.step = function () {
    };
    Field.prototype.attacheMove = function () {
        var _this = this;
        var begin_position;
        this.view.interactive = true;
        this.view.buttonMode = true;
        this.view.mousedown = this.view.touchstart = function (data) {
            data.originalEvent.preventDefault();
            // store a reference to the data
            // The reason for this is because of multitouch
            // we want to track the movement of this particular touch
            _this.data = data;
            _this.dragging = true;
            begin_position = _this.view.position.clone();
        };
        this.view.mousemove = this.view.touchmove = function (data) {
            if (!_this.dragging) {
                return;
            }
            var newPosition = _this.data.getLocalPosition(_this.view.parent);
            _this.view.position.x = newPosition.x;
            _this.view.position.y = newPosition.y;
        };
        this.view.mouseup = this.view.mouseupoutside = this.view.touchend = this.view.touchendoutside = function (data) {
            _this.dragging = false;
            // set the interaction data to null
            _this.data = null;
            if (_this.drop_area.isPointIn(_this.view.position)) {
                _this.drop_area.setFieldPlace(_this);
                return;
            }
            _this.view.position = begin_position;
        };
    };
    Field.prototype.getPicture = function () {
        return "static/image/x.png";
    };
    Field.prototype.setInteractive = function (interactive) {
        this.view.interactive = interactive;
        this.view.alpha = interactive ? 1 : 0.5;
    };
    Field.prototype.getPosition = function () {
        return this.view.position;
    };
    Field.prototype.setPosition = function (x, y) {
        this.view.position.x = x;
        this.view.position.y = y;
    };
    return Field;
})();
var FieldX = (function (_super) {
    __extends(FieldX, _super);
    function FieldX() {
        _super.apply(this, arguments);
    }
    FieldX.prototype.getPicture = function () {
        return "static/image/pingX.png";
    };
    return FieldX;
})(Field);
var FieldO = (function (_super) {
    __extends(FieldO, _super);
    function FieldO() {
        _super.apply(this, arguments);
    }
    FieldO.prototype.getPicture = function () {
        return "static/image/pingO.png";
    };
    return FieldO;
})(Field);
//# sourceMappingURL=field.js.map