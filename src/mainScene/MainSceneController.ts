import { globalEvent } from "@billjs/event-emitter";
import { GameModel, GameScene } from "../GameModel";
import { MainSceneView } from "./MainSceneView";
import { GameEvents } from "../GameEvents";
import { MainSceneEvents } from "./MainSceneEvents";
import { Loader, Ticker } from "pixi.js";
import { Sound } from "@pixi/sound";

export class MainSceneController {
  protected view: MainSceneView;
  protected model: GameModel;
  protected ticker: Ticker;
  protected sound: Sound;

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

    //** Create ticker.
    this.ticker = Ticker.shared;
    this.ticker.add((dt) => {
      this.view.update(dt);
    });

    //** Create sound.
    this.sound = Sound.from(Loader.shared.resources.music);
    this.sound.play({
      loop: true,
    });
  }

  protected changeScoreHandler() {
    this.view.setScoreValue(this.model.score);
  }

  protected pointerdownHandler() {
    if (this.view.hero) this.view.hero.startJump();
  }

  protected dieHeroHandler() {
    this.model.scene = GameScene.FINAL;
  }

  protected collectDiamondHandler() {
    this.model.score++;
  }

  destroy() {
    this.ticker.destroy();
    this.sound.stop();
    globalEvent.off(GameEvents.CHANGE_SCORE, this.boundChangeScore);
    globalEvent.off(MainSceneEvents.DIAMOND_COLLECT, this.boundCollectDiamond);
    this.view.hero.sprite.off(MainSceneEvents.HERO_DIE, this.boundDieHero);
    this.view.container.off("pointerdown", this.boundPointerdown);
  }
}
