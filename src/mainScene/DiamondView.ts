import * as PIXI from "pixi.js";
import { HeroView } from "./HeroView";

export class DiamondView {
  public sprite: PIXI.Sprite | null;

  constructor(x: number, y: number) {
    this.sprite = new PIXI.Sprite(PIXI.Texture.from("diamond"));
    this.sprite.x = x;
    this.sprite.y = y;
  }

  checkCollision(hero: HeroView) {
    if (!this.sprite) {
      return;
    }

    if (this.isOverlap(hero)) {
      hero.collectDiamond();
      this.sprite.destroy();
      this.sprite = null;
    }
  }

  isOverlap(hero: HeroView) {
    if (this.top === null) return false;
    if (this.bottom === null) return false;
    if (this.left === null) return false;
    if (this.right === null) return false;
    return (
      hero.bottom >= this.top &&
      hero.top <= this.bottom &&
      hero.right >= this.left &&
      hero.left <= this.right
    );
  }

  get left() {
    if (this.sprite) {
      return this.sprite.x + this.sprite.parent.x;
    }
    return null;
  }

  get right() {
    if (this.sprite) {
      return this.sprite.x + this.sprite.parent.x + this.sprite.width;
    }
    return null;
  }

  get top() {
    if (this.sprite) {
      return this.sprite.y + this.sprite.parent.y;
    }
    return null;
  }

  get bottom() {
    if (this.sprite) {
      return this.sprite.y + this.sprite.parent.y + this.sprite.height;
    }
    return null;
  }
}
