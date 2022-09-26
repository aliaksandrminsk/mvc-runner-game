import * as PIXI from "pixi.js";
import { Loader } from "./Loader";
import { GameController } from "./GameController";
import { GameView } from "./GameView";
import { GameModel } from "./GameModel";
import { GameConstants } from "./GameConstants";

export class App {
  protected _gameModel: GameModel | null = null;
  protected _gameController: GameController | null = null;
  protected _gameView: GameView | null = null;

  private render: PIXI.AbstractRenderer;

  constructor() {
    this.render = PIXI.autoDetectRenderer({
      width: GameConstants.GAME_AREA_WIDTH,
      height: GameConstants.GAME_AREA_HEIGHT,
      backgroundColor: 0xff0000,
      resolution: window.devicePixelRatio,
    });
  }

  //** Prepare game for start.
  run() {
    // Add canvas to Dom.
    document.body.appendChild(this.render.view);

    // load sprites
    const loader = new Loader(PIXI.Loader.shared);
    loader.preload().then(() => this.start());
  }

  //** Start game.
  start() {
    // Create game MVC.
    this._gameModel = new GameModel();
    this._gameView = new GameView();
    this._gameController = new GameController(this._gameModel, this._gameView);

    // Size and resize game.
    window.addEventListener("resize", () => this.resize());
    this.resize();

    // Render game.
    this.render.render(this._gameView.container);
    const ticker = PIXI.Ticker.shared;
    ticker.add(() => {
      if (this._gameView) {
        this.render.render(this._gameView.container);
      }
    });
  }

  // Resize game.
  resize() {
    let h = GameConstants.GAME_AREA_HEIGHT;
    let w = GameConstants.GAME_AREA_WIDTH;

    let heightRatio = 1,
      widthRation = 1;
    if (w > document.body.clientWidth) {
      widthRation = w / document.body.clientWidth;
    }
    if (h > document.body.clientHeight) {
      heightRatio = h / document.body.clientHeight;
    }
    if (widthRation > heightRatio) {
      h = h / widthRation;
      w = w / widthRation;
    } else {
      h = h / heightRatio;
      w = w / heightRatio;
    }
    this.render.view.style.width = w + "px";
    this.render.view.style.height = h + "px";
  }
}
