import { GameModel } from "./GameModel";
import { GameView } from "./GameView";
import { GameEvents } from "./GameEvents";

export class GameController {
  private readonly _gameModel: GameModel;
  private readonly _gameView: GameView;

  constructor(game: GameModel, gameView: GameView) {
    this._gameModel = game;
    this._gameView = gameView;

    //** Add listeners to the GameController.
    window.addEventListener(GameEvents.HERO_DIE, () => this.loseGame());
    window.addEventListener(GameEvents.FINAL_SCENE_CLICKED, () =>
      this.startGame()
    );
    window.addEventListener(GameEvents.DIAMOND_COLLECT, () =>
      this.collectDiamond()
    );
  }

  private get gameModel(): GameModel {
    return this._gameModel;
  }

  //** Set state when user play a game.
  protected startGame() {
    this.gameModel.score = 0;
    this.gameModel.scene = "main";
  }

  //** Set state of lose game.
  protected loseGame() {
    this.gameModel.scene = "final";
  }

  //** Collect diamond.
  protected collectDiamond() {
    this.gameModel.score++;
  }
}
