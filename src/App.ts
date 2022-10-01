import * as PIXI from "pixi.js";
import { Loader } from "./Loader";
import { GameController } from "./GameController";
import { GameView } from "./GameView";
import { GameModel } from "./GameModel";
import { GameConstants } from "./GameConstants";

export class App {
  private readonly renderer: PIXI.AbstractRenderer;

  constructor() {
    this.renderer = PIXI.autoDetectRenderer({
      width: GameConstants.GAME_AREA_WIDTH,
      height: GameConstants.GAME_AREA_HEIGHT,
      backgroundColor: 0xff0000,
      resolution: window.devicePixelRatio,
    });
  }

  //** Prepare game for start.
  run() {
    // Add canvas to Dom.
    document.body.appendChild(this.renderer.view);

    // load sprites
    const loader = new Loader(PIXI.Loader.shared);
    loader.preload().then(() => this.start());
  }

  //** Start game.
  start() {
    // Create game MVC.
    const gameModel = new GameModel();
    const gameView = new GameView();
    const gameController = new GameController(gameModel, gameView);

    // Size and resize game.
    window.addEventListener("resize", () =>
      gameController.resize(this.renderer)
    );
    gameController.resize(this.renderer);

    // Render game.
    this.renderer.render(gameView.container);
    const ticker = PIXI.Ticker.shared;
    ticker.add(() => {
      if (gameView) {
        this.renderer.render(gameView.container);
      }
    });
  }
}
