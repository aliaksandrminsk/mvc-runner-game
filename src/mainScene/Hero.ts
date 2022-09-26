import { Loader, AnimatedSprite, Texture } from "pixi.js";
import { GameConstants } from "../GameConstants";
import { Platform } from "./Platform";
import { Sound } from "@pixi/sound";
import { globalEvent } from "@billjs/event-emitter";
import { MainSceneEvents } from "./MainSceneEvents";

export class Hero {
  protected dy: number;
  protected jumpIndex: number;
  protected jumpSound: Sound;
  public platform: Platform | null;
  public sprite: AnimatedSprite;

  constructor() {
    this.dy = 0;
    this.jumpIndex = 0;
    this.platform = null;

    this.jumpSound = Sound.from(Loader.shared.resources.jumpSound);

    this.sprite = new AnimatedSprite([Texture.from("jump")]);
    this.sprite.x = 100;
    this.sprite.y = 100;
    this.sprite.loop = true;
    this.sprite.animationSpeed = 0.1;
  }

  collectDiamond() {
    globalEvent.fire(MainSceneEvents.DIAMOND_COLLECT);
  }

  startJump() {
    if (this.platform || this.jumpIndex === 1) {
      ++this.jumpIndex;
      this.platform = null;
      this.dy = -18;
      this.setAppearance(true);
      this.jumpSound.play();
    }
  }

  get left() {
    return this.sprite.x;
  }

  get right() {
    return this.left + this.sprite.width;
  }

  get top() {
    return this.sprite.y;
  }

  get bottom() {
    return this.top + this.sprite.height;
  }

  get nextbottom() {
    return this.bottom + this.dy;
  }

  stayOnPlatform(platform: Platform) {
    if (!this.platform) {
      this.setAppearance(false);
    }

    this.platform = platform;
    this.dy = 0;
    this.jumpIndex = 0;
    this.sprite.y = platform.top - this.sprite.height;
  }

  moveByPlatform(platform: Platform) {
    this.sprite.x = platform.nextleft - this.sprite.width;
  }

  setAppearance(isJump: boolean) {
    if (isJump) {
      this.sprite.textures = [Texture.from("jump")];
      this.sprite.stop();
    } else {
      this.sprite.textures = [
        Texture.from("walk1"),
        Texture.from("walk2"),
        Texture.from("walk3"),
        Texture.from("walk4"),
      ];
      this.sprite.play();
    }
  }

  update() {
    if (!this.platform) {
      ++this.dy;
      this.sprite.y += this.dy;
    }
    if (this.sprite.y > GameConstants.GAME_AREA_HEIGHT) {
      globalEvent.fire(MainSceneEvents.HERO_DIE);
    }
  }
}
