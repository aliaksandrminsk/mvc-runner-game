import * as PIXI from "pixi.js";
import { Background } from "./Background";
import { Platforms } from "./Platforms";
import { Hero } from "./Hero";
import { LabelScore } from "./LabelScore";
import { GameViewEvent } from "../events/GameViewEvent";
import { Sound } from "@pixi/sound";
import { GameModelEvent } from "../events/GameModelEvent";
import { Game } from "../models/Game";
import { Scene } from "./Scene";

export class MainScene extends Scene {
  protected game: Game;
  protected sound: Sound;

  protected hero: Hero | null = null;
  protected bg: Background | null = null;
  protected platforms: Platforms | null = null;

  constructor(game: Game) {
    super();
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
    const labelScore = new LabelScore();
    this.container.addChild(labelScore);
    this.game.on(GameModelEvent.CHANGE_SCORE, () => {
      labelScore.renderScore(this.game.score);
    });
  }

  createBackground() {
    this.bg = new Background();
    this.container.addChild(this.bg.container);
  }

  createPlatforms() {
    this.platforms = new Platforms();
    this.container.addChild(this.platforms.container);
  }

  createHero() {
    this.hero = new Hero();
    this.container.addChild(this.hero.sprite);
    this.container.interactive = true;
    this.container.on("pointerdown", () => {
      if (this.hero) this.hero.startJump();
    });
    this.hero.sprite.once("die", () => {
      window.dispatchEvent(new Event(GameViewEvent.HERO_DIE));
    });
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
