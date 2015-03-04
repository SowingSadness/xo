"use strict";
var PixiApp = (function () {
    function PixiApp(container, width, height) {
        this.container = container;
        this.width = width;
        this.height = height;
        this.FPS = 60;
        this.actions = [];
        this.stage = new PIXI.Stage(0xC17F4B);
        this.renderer = PIXI.autoDetectRenderer(width, height);
    }
    PixiApp.prototype.addAction = function (action) {
        this.actions.push(action);
    };
    PixiApp.prototype.render = function () {
        var _this = this;
        for (var i = 0; i < this.actions.length; i++) {
            this.actions[i].step();
        }
        this.renderer.render(this.stage);
        setTimeout(function () { return requestAnimFrame(function () { return _this.render(); }); }, 1000 / this.FPS);
    };
    PixiApp.prototype.launch = function () {
        var _this = this;
        this.actions.forEach(function (action) {
            _this.stage.addChild(action.getView(_this.stage));
        });
        this.container.appendChild(this.renderer.view);
        requestAnimFrame(function () { return _this.render(); });
    };
    return PixiApp;
})();
//# sourceMappingURL=core.js.map