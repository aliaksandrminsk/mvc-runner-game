import { Loader, Ticker } from "pixi.js";
import { Background } from "../commonViews/Background";
import { Platforms } from "./Platforms";
import { Hero } from "./Hero";
import { LabelScore } from "../commonViews/LabelScore";
//import { GameEvents } from "../GameEvents";
import { Sound } from "@pixi/sound";
//import { GameModel } from "../GameModel";
import { Scene } from "../commonViews/Scene";

export class MainSceneView extends Scene {
  //protected game: GameModel;
  protected sound: Sound;

  public hero: Hero;
  protected bg: Background;
  protected platforms: Platforms;
  protected labelScore: LabelScore;

  constructor() {
    super();
    //this.game = game;

    //this.createBackground();
    //this.createPlatforms();
    //this.createHero();
    //this.createUI();

    //** Create background.
    this.bg = new Background();
    this.container.addChild(this.bg.container);

    //** Create platforms.
    this.platforms = new Platforms();
    this.container.addChild(this.platforms.container);

    //** Create labelScore.
    this.labelScore = new LabelScore();
    this.container.addChild(this.labelScore);

    //** Create hero.
    this.hero = new Hero();
    this.container.addChild(this.hero.sprite);
    this.container.interactive = true;

    //** Create sound.
    this.sound = Sound.from(Loader.shared.resources.music);
    this.sound.play({
      loop: true,
    });

    const ticker = Ticker.shared;
    ticker.add((dt) => {
      this.update(dt);
    });
  }

  // createUI() {
  //   const labelScore = new LabelScore();
  //   this.container.addChild(labelScore);
  //   // this.game.on(GameEvents.CHANGE_SCORE, () => {
  //   //   labelScore.renderScore(this.game.score);
  //   // });
  // }

  setScoreValue(value: number) {
    if (this.labelScore) {
      this.labelScore.renderScore(value);
    }
  }

  // createBackground() {
  //   this.bg = new Background();
  //   this.container.addChild(this.bg.container);
  // }
  //
  // createPlatforms() {
  //   this.platforms = new Platforms();
  //   this.container.addChild(this.platforms.container);
  // }

  // createHero() {
  //   this.hero = new Hero();
  //   this.container.addChild(this.hero.sprite);
  //   this.container.interactive = true;
  //   // this.container.on("pointerdown", () => {
  //   //   if (this.hero) this.hero.startJump();
  //   // });
  //   // this.hero.sprite.once("die", () => {
  //   //   window.dispatchEvent(new Event(GameEvents.HERO_DIE));
  //   // });
  // }

  update(dt: number) {
    if (this.bg) this.bg.update(dt);
    if (this.platforms) {
      if (this.hero) this.platforms.checkCollision(this.hero);
      this.platforms.update();
    }
    if (this.hero) this.hero.update();
  }

  destroy() {
    super.destroy();
    this.sound.stop();
  }
}
