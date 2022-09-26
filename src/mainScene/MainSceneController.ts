import { globalEvent } from "@billjs/event-emitter";
import { GameModel, GameScene } from "../GameModel";
import { MainSceneView } from "./MainSceneView";
import { GameEvents } from "../GameEvents";
import { MainSceneEvents } from "./MainSceneEvents";
import { Loader, Ticker } from "pixi.js";
import { Sound } from "@pixi/sound";
import { PlatformsController } from "../platforms/PlatformsController";

export class MainSceneController {
  protected view: MainSceneView;
  protected model: GameModel;
  protected ticker: Ticker;
  protected sound: Sound;

  protected platformsController: PlatformsController;

  boundPointerdown = () => this.pointerdownHandler();
  boundDieHero = () => this.dieHeroHandler();
  boundCollectDiamond = () => this.collectDiamondHandler();
  boundChangeScore = () => this.changeScoreHandler();
  boundTickerCallBack = (dt: number) => this.tickerCallBackHandler(dt);

  constructor(view: MainSceneView, model: GameModel) {
    this.view = view;
    this.model = model;

    this.platformsController = new PlatformsController(this.view.platforms);

    globalEvent.on(GameEvents.CHANGE_SCORE, this.boundChangeScore);
    globalEvent.on(MainSceneEvents.DIAMOND_COLLECT, this.boundCollectDiamond);
    globalEvent.on(MainSceneEvents.HERO_DIE, this.boundDieHero);
    this.view.container.on("pointerdown", this.boundPointerdown);

    //** Create ticker.
    this.ticker = Ticker.shared;
    this.ticker.add(this.boundTickerCallBack);

    //** Create sound.
    this.sound = Sound.from(Loader.shared.resources.music);
    this.sound.play({
      loop: true,
    });
  }

  protected tickerCallBackHandler(dt: number) {
    this.view.update(dt);
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
    this.ticker.remove(this.boundTickerCallBack);
    this.sound.stop();
    globalEvent.off(GameEvents.CHANGE_SCORE, this.boundChangeScore);
    globalEvent.off(MainSceneEvents.DIAMOND_COLLECT, this.boundCollectDiamond);
    globalEvent.off(MainSceneEvents.HERO_DIE, this.boundDieHero);
    this.view.container.off("pointerdown", this.boundPointerdown);
    this.platformsController.destroy();
  }
}
