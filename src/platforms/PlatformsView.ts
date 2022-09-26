import { Container } from "pixi.js";
import { GameConstants } from "../GameConstants";
import { HeroView } from "../mainScene/HeroView";
import { PlatformView } from "./PlatformView";

interface IRange {
  min: number;
  max: number;
}

interface IPlatformParameters {
  rows: number;
  cols: number;
  x: number;
}

export class PlatformsView {
  public container: Container;
  public platforms: Array<PlatformView>;
  private ranges: { rows: IRange; cols: IRange; offset: IRange };
  private current: PlatformView | null = null;

  constructor() {
    this.platforms = [];
    this.container = new Container();
    this.ranges = {
      rows: {
        min: 2,
        max: 6,
      },
      cols: {
        min: 3,
        max: 9,
      },
      offset: {
        min: 60,
        max: 200,
      },
    };

    this.createPlatform({
      rows: 4,
      cols: 6,
      x: 200,
    });
  }

  get randomData() {
    const data = { rows: 0, cols: 0, x: 0 };

    const offset =
      this.ranges.offset.min +
      Math.round(
        Math.random() * (this.ranges.offset.max - this.ranges.offset.min)
      );

    if (this.current) {
      data.x = this.current.right + offset;
    }

    data.cols =
      this.ranges.cols.min +
      Math.round(Math.random() * (this.ranges.cols.max - this.ranges.cols.min));
    data.rows =
      this.ranges.rows.min +
      Math.round(Math.random() * (this.ranges.rows.max - this.ranges.rows.min));

    return data;
  }

  createPlatform(data: IPlatformParameters) {
    const platform = new PlatformView(data.rows, data.cols, data.x);
    this.container.addChild(platform.container);
    this.platforms.push(platform);
    this.current = platform;
  }

  checkCollision(hero: HeroView) {
    this.platforms.forEach((platform) => {
      platform.checkCollision(hero);
    });
  }

  update() {
    if (this.current && this.current.right < GameConstants.GAME_AREA_WIDTH) {
      this.createPlatform(this.randomData);
    }

    this.platforms.forEach((platform) => {
      platform.move();
    });
  }
}
