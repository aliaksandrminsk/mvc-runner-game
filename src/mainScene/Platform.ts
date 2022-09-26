import { Diamond } from "./Diamond";
import { Texture, Container, Sprite } from "pixi.js";
import { GameConstants } from "../GameConstants";
import { Hero } from "./Hero";
import { MainSceneEvents } from "./MainSceneEvents";
import { globalEvent } from "@billjs/event-emitter";

const TileSize = 64;

export class Platform {
  private diamonds: Array<Diamond>;
  private readonly diamondsOffsetMin: number;
  private readonly diamondsOffsetMax: number;
  private readonly rows: number;
  private readonly cols: number;
  private readonly width: number;
  private readonly height: number;
  private readonly dx: number;
  public container: Container;

  constructor(rows: number, cols: number, x: number) {
    this.diamonds = [];
    this.diamondsOffsetMin = 100;
    this.diamondsOffsetMax = 200;

    this.dx = -5;

    this.rows = rows;
    this.cols = cols;

    this.width = cols * TileSize;
    this.height = rows * TileSize;

    this.container = new Container();
    this.container.x = x;
    this.container.y = GameConstants.GAME_AREA_HEIGHT - this.rows * TileSize;

    this.createTiles();
    this.createDiamonds();
  }

  createDiamonds() {
    const y =
      this.diamondsOffsetMin +
      Math.random() * (this.diamondsOffsetMax - this.diamondsOffsetMin);

    for (let i = 0; i < this.cols; i++) {
      if (Math.random() < 0.4) {
        const diamond = new Diamond(64 * i, -y);
        if (diamond.sprite) this.container.addChild(diamond.sprite);
        this.diamonds.push(diamond);
      }
    }
  }

  checkCollision(hero: Hero) {
    this.diamonds.forEach((diamond) => diamond.checkCollision(hero));

    if (this.isCollideTop(hero)) {
      hero.stayOnPlatform(this);
    } else {
      if (hero.platform === this) {
        hero.platform = null;
      }

      if (this.isCollideLeft(hero)) {
        hero.moveByPlatform(this);
      }
    }
  }

  isCollideTop(hero: Hero) {
    return (
      hero.right >= this.left &&
      hero.left <= this.right &&
      hero.bottom <= this.top &&
      hero.nextbottom >= this.top
    );
  }

  isCollideLeft(hero: Hero) {
    return (
      hero.bottom >= this.top &&
      hero.top <= this.bottom &&
      hero.right <= this.left &&
      hero.right >= this.nextleft
    );
  }

  get nextleft() {
    return this.left + this.dx;
  }

  get left() {
    return this.container.x;
  }

  get right() {
    return this.left + this.width;
  }

  get top() {
    return this.container.y;
  }

  get bottom() {
    return this.top + this.height;
  }

  createTiles() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.createTile(row, col);
      }
    }
  }

  createTile(row: number, col: number) {
    const texture = row === 0 ? "platform" : "tile";
    const tile = new Sprite(Texture.from(texture));

    this.container.addChild(tile);
    tile.x = col * tile.width;
    tile.y = row * tile.height;
  }

  move() {
    this.container.x += this.dx;
    if (this.right < 0) {
      globalEvent.fire(MainSceneEvents.PLATFORM_HIDDEN, this.container);
      //this.container.emit(MainSceneEvents.PLATFORM_HIDDEN);
    }
  }
}
