//import { GameEvents } from "../GameEvents";
//import { Scene } from "../commonViews/Scene";
import { globalEvent } from "@billjs/event-emitter";

import { GameModel, GameScene } from "../GameModel";
import { MainSceneView } from "./MainSceneView";
import { GameEvents } from "../GameEvents";

export class MainSceneController {
  protected view: MainSceneView;
  protected model: GameModel;

  constructor(view: MainSceneView, model: GameModel) {
    this.view = view;
    this.model = model;

    globalEvent.on(GameEvents.CHANGE_SCORE, () =>
      this.view.setScoreValue(model.score)
    );
    globalEvent.on(GameEvents.DIAMOND_COLLECT, () => this.collectDiamond());

    this.view.container.on("pointerdown", () => {
      if (this.view.hero) this.view.hero.startJump();
    });
    this.view.hero.sprite.once("die", () => {
      model.scene = GameScene.FINAL;
      //window.dispatchEvent(new Event(GameEvents.HERO_DIE));
    });
  }

  protected collectDiamond() {
    this.model.score++;
  }

  destroy() {
    //globalEvent.off
    this.view.container.removeAllListeners("pointerdown");
    this.view.hero.sprite.removeAllListeners("die");
  }
}
