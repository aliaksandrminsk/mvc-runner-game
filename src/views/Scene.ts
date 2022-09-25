import * as PIXI from "pixi.js";

export class Scene extends PIXI.utils.EventEmitter {
  public container: PIXI.Container;

  protected constructor() {
    super();
    this.container = new PIXI.Container();
  }

  destroy() {
    this.container.destroy();
  }
}
