import { GameScene } from "./GameModel";
import { Container } from "pixi.js";

import { FinalSceneView } from "./finalScene/FinalSceneView";
import { MainSceneView } from "./mainScene/MainSceneView";
import { SceneView } from "./common/SceneView";

export class GameView {
  public container: Container;
  public scene: SceneView;

  constructor() {
    this.container = new Container();

    //** Initialization of game.
    this.scene = new MainSceneView();
    this.container.addChild(this.scene.container);
  }

  setScene(scene: GameScene) {
    if (this.scene) {
      this.container.removeChild(this.scene.container);
      this.scene.destroy();
    }
    if (scene === GameScene.MAIN) {
      this.scene = new MainSceneView();
    } else if (scene === GameScene.FINAL) {
      this.scene = new FinalSceneView();
    }
    if (this.scene) {
      this.container.addChild(this.scene.container);
    }
  }
}
