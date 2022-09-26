import { Loader, Ticker } from "pixi.js";
import { Background } from "../common/Background";
import { Platforms } from "./Platforms";
import { Hero } from "./Hero";
import { LabelScore } from "../common/LabelScore";
import { Sound } from "@pixi/sound";
import { Scene } from "../common/Scene";

export class MainSceneView extends Scene {
  protected sound: Sound;

  public hero: Hero;
  protected bg: Background;
  protected platforms: Platforms;
  protected labelScore: LabelScore;

  constructor() {
    super();

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

  setScoreValue(value: number) {
    if (this.labelScore) {
      this.labelScore.renderScore(value);
    }
  }

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
