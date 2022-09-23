import { Game } from "../models/Game";
import { GameView } from "../views/GameView";
import {GameViewEvent} from "../events/GameViewEvent";
//import {constants} from "../constants";

export class GameController {
  private readonly _gameModel: Game;
  private readonly _gameView: GameView;

  constructor(game: Game, gameView: GameView) {
    this._gameModel = game;
    this._gameView = gameView;

    //** Add listeners to the GameController.
    // this.gameView.on(GameViewEvent.START_BUTTON_CLICKED, () =>
    //   this.startGame()
    // );
    // this.gameView.on(GameViewEvent.AGAIN_BUTTON_CLICKED, () =>
    //   this.startGame()
    // );
    //this.gameView.on(GameViewEvent.HERO_DIE, () => this.loseGame());
    //this.gameView.on(GameViewEvent.FINAL_SCENE_CLICKED, () => this.startGame());
    window.addEventListener(GameViewEvent.HERO_DIE, () => this.loseGame());
    window.addEventListener(GameViewEvent.FINAL_SCENE_CLICKED, () => this.startGame());

    //window.addEventListener("resize", () => this.resize());
    // this.gameView.gridView.on(GameViewEvent.CHANGE_PIECE_POS, () => {
    //   if (this.gameModel.grid.isWinCombination()) {
    //     this.winGame();
    //   }
    // });
  }

  private get gameView(): GameView {
    return this._gameView;
  }

  private get gameModel(): Game {
    return this._gameModel;
  }

  //** Set state when user play a game.
  protected startGame() {
    this.gameModel.scene = "main";
  }

  //** Set state of lose game.
  protected loseGame() {
    this.gameModel.scene = "final";
  }

  // Resize game.
  // protected resize() {
  //   const ratio = constants.GAME_AREA_SIZE_L / constants.GAME_AREA_SIZE_S;
  //   let w, h;
  //   if (window.innerWidth / window.innerHeight >= ratio) {
  //     w = window.innerHeight * ratio;
  //     h = window.innerHeight;
  //   } else {
  //     w = window.innerWidth;
  //     h = window.innerWidth / ratio;
  //   }
  //   this.gameModel.screenSize = {width: w, height: h};
  // }
}
