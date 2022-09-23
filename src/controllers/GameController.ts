import { Game } from "../models/Game";
import { GameView } from "../views/GameView";
import {GameViewEvent} from "../events/GameViewEvent";
import {HeroViewEvent} from "../events/HeroViewEvent";

export class GameController {
  private readonly _gameModel: Game;
  private readonly _gameView: GameView;

  constructor(game: Game, gameView: GameView) {
    this._gameModel = game;
    this._gameView = gameView;

    //** Add listeners to the GameController.
    window.addEventListener(GameViewEvent.HERO_DIE, () => this.loseGame());
    window.addEventListener(GameViewEvent.FINAL_SCENE_CLICKED, () => this.startGame());
    window.addEventListener(HeroViewEvent.DIAMOND_COLLECT, () => this.collectDiamond());
  }

  private get gameModel(): Game {
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
