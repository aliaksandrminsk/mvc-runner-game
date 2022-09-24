import * as PIXI from "pixi.js";
import { Background } from "./Background.ts";
import { LabelScore } from "./LabelScore.ts";
import { GameViewEvent } from "../events/GameViewEvent";
import { constants } from "../constants";

export class FinalScene extends PIXI.utils.EventEmitter {
  constructor(game) {
    super();
    this.container = new PIXI.Container();
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
    this.bg = new Background();
    this.container.addChild(this.bg.container);
  }

  createPopup() {
    this.popup = new PIXI.Graphics();
    const width = 600;
    const height = 400;
    const x = constants.GAME_AREA_SIZE_L / 2 - width / 2;
    const y = constants.GAME_AREA_SIZE_S / 2 - height / 2;
    this.popup.beginFill(0x000000, 0.5);
    this.popup.drawRect(x, y, width, height);
    this.container.addChild(this.popup);
  }

  createLabelScore(amount) {
    this.labelScore = new LabelScore(
      constants.GAME_AREA_SIZE_L / 2,
      constants.GAME_AREA_SIZE_S / 2 - 100,
      0.5
    );
    this.labelScore.renderScore(amount);
    this.container.addChild(this.labelScore);
  }

  createText() {
    const text = new PIXI.Text();
    text.anchor.set(0.5);
    text.x = constants.GAME_AREA_SIZE_L / 2;
    text.y = constants.GAME_AREA_SIZE_S / 2 + 100;
    text.style = {
      fontFamily: "Verdana",
      fontWeight: "normal",
      fontSize: 34,
      fill: ["#FFFFFF"],
    };
    text.text = "Tap to restart";
    this.popup.addChild(text);
  }

  destroy() {
    this.container.destroy();
  }
}
