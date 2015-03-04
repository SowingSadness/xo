"use strict";

class PixiApp {
    private FPS: number = 60;
    private renderer: PIXI.IPixiRenderer;
    protected stage: PIXI.Stage;
    private actions: Action[];

    constructor(protected container: HTMLElement, private width: number, private height: number) {
        this.actions = [];
        this.stage = new PIXI.Stage(0xC17F4B);
        this.renderer = PIXI.autoDetectRenderer(width, height);
    }

    addAction(action: Action) {
        this.actions.push(action);
    }

    private render() {
        for (var i=0; i<this.actions.length; i++) {
            this.actions[i].step();
        }
        this.renderer.render(this.stage);
        setTimeout(() => requestAnimFrame(() => this.render()), 1000 / this.FPS);
    }

    launch() {
        this.actions.forEach((action)=>{
            this.stage.addChild(action.getView(this.stage))
        });
        this.container.appendChild(this.renderer.view);
        requestAnimFrame(() => this.render());
    }
}

interface Action {
    getView(stage: PIXI.Stage): PIXI.DisplayObject;
    step(): void;
}