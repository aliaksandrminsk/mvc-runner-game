import { FinalSceneView } from "./FinalSceneView";
import { GameModel, GameScene } from "../GameModel";

export class FinalSceneController {
  protected view: FinalSceneView;
  protected model: GameModel;

  boundPointerdown = () => this.pointerdownHandler();

  constructor(view: FinalSceneView, model: GameModel) {
    this.view = view;
    this.model = model;
    this.view.createLabelScore(model.score);
    this.view.container.once("pointerdown", this.boundPointerdown);
  }

  protected pointerdownHandler() {
    this.model.scene = GameScene.MAIN;
  }

  destroy() {
    this.view.container.off("pointerdown", this.boundPointerdown);
  }
}
