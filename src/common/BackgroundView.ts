import { Container, Sprite, Texture } from "pixi.js";

export class BackgroundView {
  public container: Container;
  protected readonly speed: number;
  protected sprites: Array<Sprite> = [];

  constructor() {
    this.speed = 2;
    this.container = new Container();
    this.createSprites();
  }

  createSprites() {
    this.sprites = [];
    for (let i = 0; i < 3; i++) {
      this.createSprite(i);
    }
  }

  createSprite(i: number) {
    const sprite = new Sprite(Texture.from("background"));
    sprite.x = sprite.width * i;
    sprite.y = 0;
    this.container.addChild(sprite);
    this.sprites.push(sprite);
  }

  move(sprite: Sprite, offset: number) {
    const spriteRightX = sprite.x + sprite.width;
    const screenLeftX = 0;
    if (spriteRightX <= screenLeftX) {
      sprite.x += sprite.width * this.sprites.length;
    }
    sprite.x -= offset;
  }

  update(dt: number) {
    const offset = this.speed * dt;
    this.sprites.forEach((sprite) => {
      this.move(sprite, offset);
    });
  }
}
