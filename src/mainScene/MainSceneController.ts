//import { GameEvents } from "../GameEvents";
//import { Scene } from "../commonViews/Scene";
import { globalEvent } from "@billjs/event-emitter";

import { GameModel, GameScene } from "../GameModel";
import { MainSceneView } from "./MainSceneView";
import { GameEvents } from "../GameEvents";
import { MainSceneEvents } from "./MainSceneEvents";

export class MainSceneController {
  protected view: MainSceneView;
  protected model: GameModel;

  boundPointerdown = () => this.pointerdownHandler();
  boundDieHero = () => this.dieHeroHandler();
  boundCollectDiamond = () => this.collectDiamondHandler();
  boundChangeScore = () => this.changeScoreHandler();

  constructor(view: MainSceneView, model: GameModel) {
    this.view = view;
    this.model = model;

    globalEvent.on(GameEvents.CHANGE_SCORE, this.boundChangeScore);
    globalEvent.on(MainSceneEvents.DIAMOND_COLLECT, this.boundCollectDiamond);
    this.view.hero.sprite.on(MainSceneEvents.HERO_DIE, this.boundDieHero);
    this.view.container.on("pointerdown", this.boundPointerdown);
  }

  protected changeScoreHandler() {
    this.view.setScoreValue(this.model.score);
  }

  protected pointerdownHandler() {
    if (this.view.hero) this.view.hero.startJump();
  }

  protected dieHeroHandler() {
    console.log("MainSceneController dieHeroHandler 12");
    this.model.scene = GameScene.FINAL;
  }

  protected collectDiamondHandler() {
    this.model.score++;
  }

  destroy() {
    globalEvent.off(GameEvents.CHANGE_SCORE, this.boundChangeScore);
    globalEvent.off(MainSceneEvents.DIAMOND_COLLECT, this.boundCollectDiamond);
    // globalEvent.off(GameEvents.HERO_DIE, this.boundDieHero);
    this.view.hero.sprite.off(MainSceneEvents.HERO_DIE, this.boundDieHero);
    this.view.container.off("pointerdown", this.boundPointerdown);
  }
}
