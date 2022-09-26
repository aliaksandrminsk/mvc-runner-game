//import { GameEvents } from "../GameEvents";
import { FinalSceneView } from "./FinalSceneView";
import { GameModel, GameScene } from "../GameModel";

export class FinalSceneController {
  protected view: FinalSceneView;

  constructor(view: FinalSceneView, model: GameModel) {
    this.view = view;
    this.view.createLabelScore(model.score);
    this.view.container.once("pointerdown", () => {
      //window.dispatchEvent(new Event(GameEvents.FINAL_SCENE_CLICKED));
      model.scene = GameScene.MAIN;
    });
  }

  destroy() {
    this.view.container.removeAllListeners("pointerdown");
  }
}
