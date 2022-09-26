import { Container } from "pixi.js";

export class Scene {
  public container: Container;

  protected constructor() {
    this.container = new Container();
  }

  destroy() {
    this.container.destroy();
  }
}
