import * as PIXI from "pixi.js";
import { constants } from "../constants";
import { Platform } from "./Platform";
import { GameViewEvent } from "../events/GameViewEvent";

export class Hero {
  private score: number;
  private dy: number;
  private jumpIndex: number;
  public platform: Platform | null;
  public sprite: PIXI.AnimatedSprite;

  constructor() {
    this.score = 0;
    this.dy = 0;
    this.jumpIndex = 0;
    this.platform = null;

    this.sprite = new PIXI.AnimatedSprite([PIXI.Texture.from("jump")]);
    this.setAppearance(true);

    this.sprite.x = 100;
    this.sprite.y = 100;
    this.sprite.loop = true;
    this.sprite.animationSpeed = 0.1;
    this.sprite.play();
  }

  collectDiamond() {
    ++this.score;
    window.dispatchEvent(new Event(GameViewEvent.DIAMOND_COLLECT));
  }

  startJump() {
    if (this.platform || this.jumpIndex === 1) {
      ++this.jumpIndex;
      this.platform = null;
      this.dy = -18;
      this.setAppearance(true);
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
      this.sprite.textures = [PIXI.Texture.from("jump")];
      this.sprite.stop();
    } else {
      this.sprite.textures = [
        PIXI.Texture.from("walk1"),
        PIXI.Texture.from("walk2"),
        PIXI.Texture.from("walk3"),
        PIXI.Texture.from("walk4"),
      ];
      this.sprite.play();
    }
  }

  update() {
    if (!this.platform) {
      ++this.dy;
      this.sprite.y += this.dy;
    }

    if (this.sprite.y > constants.GAME_AREA_HEIGHT) {
      this.sprite.emit("die");
    }
  }
}
