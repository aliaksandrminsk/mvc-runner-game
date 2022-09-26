import { Background } from "../commonViews/Background";
import { Graphics, Text } from "pixi.js";
import { LabelScore } from "../commonViews/LabelScore";
import { GameConstants } from "../GameConstants";
import { Scene } from "../commonViews/Scene";

export class FinalSceneView extends Scene {
  protected popup: Graphics | null = null;

  constructor() {
    super();
    this.createBackground();
    this.createPopup();
    this.createText();
    this.container.interactive = true;
  }

  createBackground() {
    const bg = new Background();
    this.container.addChild(bg.container);
  }

  createPopup() {
    this.popup = new Graphics();
    const width = 600;
    const height = 400;
    const x = GameConstants.GAME_AREA_WIDTH / 2 - width / 2;
    const y = GameConstants.GAME_AREA_HEIGHT / 2 - height / 2;
    this.popup.beginFill(0x000000, 0.5);
    this.popup.drawRect(x, y, width, height);
    this.container.addChild(this.popup);
  }

  createLabelScore(amount: number) {
    const labelScore = new LabelScore(
      GameConstants.GAME_AREA_WIDTH / 2,
      GameConstants.GAME_AREA_HEIGHT / 2 - 100,
      0.5
    );
    labelScore.renderScore(amount);
    this.container.addChild(labelScore);
  }

  createText() {
    const text = new Text();
    text.anchor.set(0.5);
    text.x = GameConstants.GAME_AREA_WIDTH / 2;
    text.y = GameConstants.GAME_AREA_HEIGHT / 2 + 100;
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
