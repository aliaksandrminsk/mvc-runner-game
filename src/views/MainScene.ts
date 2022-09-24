import * as PIXI from "pixi.js";
import { Background } from "./Background";
import { Platforms } from "./Platforms.ts";
import { Hero } from "./Hero";
import { LabelScore } from "./LabelScore";
import { GameViewEvent } from "../events/GameViewEvent";
import { HeroViewEvent } from "../events/HeroViewEvent";
import { Sound } from "@pixi/sound";
import { GameModelEvent } from "../events/GameModelEvent";

export class MainScene extends PIXI.utils.EventEmitter {
  constructor(game) {
    super();
    this.container = new PIXI.Container();
    this.game = game;

    this.createBackground();
    this.createPlatforms();
    this.createHero();
    this.createUI();

    this.sound = Sound.from(PIXI.Loader.shared.resources.music);
    this.sound.play({
      loop: true,
    });

    const ticker = PIXI.Ticker.shared;
    ticker.add((dt) => {
      this.update(dt);
    });
  }

  createUI() {
    this.labelScore = new LabelScore();
    this.container.addChild(this.labelScore);
    this.game.on(GameModelEvent.CHANGE_SCORE, () => {
      this.labelScore.renderScore(this.game.score);
    });
  }

  createBackground() {
    this.bg = new Background();
    this.container.addChild(this.bg.container);
  }

  createPlatforms() {
    this.platfroms = new Platforms();
    this.container.addChild(this.platfroms.container);
  }

  createHero() {
    this.hero = new Hero();
    this.container.addChild(this.hero.sprite);
    this.container.interactive = true;
    this.container.on("pointerdown", () => {
      this.hero.startJump();
    });
    this.hero.sprite.once(HeroViewEvent.HERO_DIE, () => {
      window.dispatchEvent(new Event(GameViewEvent.HERO_DIE));
    });
  }

  update(dt) {
    this.bg.update(dt);
    this.platfroms.checkCollision(this.hero);
    this.platfroms.update(dt);
    this.hero.update(dt);
  }

  destroy() {
    this.container.destroy();
    this.sound.stop();
  }
}
