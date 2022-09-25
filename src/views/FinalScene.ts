import * as PIXI from "pixi.js";
import { Background } from "./Background";
import { LabelScore } from "./LabelScore";
import { GameViewEvent } from "../events/GameViewEvent";
import { constants } from "../constants";
import { Game } from "../models/Game";
import { Scene } from "./Scene";

export class FinalScene extends Scene {
  protected popup: PIXI.Graphics | null = null;

  constructor(game: Game) {
    super();
    this.createBackground();
    this.createPopup();
    this.createLabelScore(game.score);
    this.createText();
    this.container.interactive = true;
    this.container.once("pointerdown", () => {
      window.dispatchEvent(new Event(GameViewEvent.FINAL_SCENE_CLICKED));
    });
  }

  createBackground() {
    const bg = new Background();
    this.container.addChild(bg.container);
  }

  createPopup() {
    this.popup = new PIXI.Graphics();
    const width = 600;
    const height = 400;
    const x = constants.GAME_AREA_WIDTH / 2 - width / 2;
    const y = constants.GAME_AREA_HEIGHT / 2 - height / 2;
    this.popup.beginFill(0x000000, 0.5);
    this.popup.drawRect(x, y, width, height);
    this.container.addChild(this.popup);
  }

  createLabelScore(amount: number) {
    const labelScore = new LabelScore(
      constants.GAME_AREA_WIDTH / 2,
      constants.GAME_AREA_HEIGHT / 2 - 100,
      0.5
    );
    labelScore.renderScore(amount);
    this.container.addChild(labelScore);
  }

  createText() {
    const text = new PIXI.Text();
    text.anchor.set(0.5);
    text.x = constants.GAME_AREA_WIDTH / 2;
    text.y = constants.GAME_AREA_HEIGHT / 2 + 100;
    text.style = {
      fontFamily: "Verdana",
      fontWeight: "normal",
      fontSize: 34,
      fill: ["#FFFFFF"],
    };
    text.text = "Tap to restart";
    if (this.popup) {
      this.popup.addChild(text);
    }
  }
}
