import { Game } from "../models/Game";
import * as PIXI from "pixi.js";
import { GameModelEvent } from "../events/GameModelEvent";
import {FinalScene} from "./FinalScene";
import {MainScene} from "./MainScene";

export class GameView extends PIXI.utils.EventEmitter {
  private readonly _game: Game;

  public container: PIXI.Container;
  public scene: any;

  constructor(game: Game) {
    super();
    this._game = game;
    this.container = new PIXI.Container();

    //** Initialization of game.
    this.init();

    //** Listener.
    this.game.on(GameModelEvent.CHANGE_GAME_SCENE, () => this.setGameState());
  }

  get game(): Game {
    return this._game;
  }

  init() {
    this.setGameState();
  }

  setGameState() {
     if (this.scene) {
       this.container.removeChild(this.scene.container)
       this.scene.destroy();
       this.scene = null;
     }
    if (this.game.scene === "main") {

      this.scene = new MainScene(this.game);
    } else if (this.game.scene === "final") {
      this.scene = new FinalScene();
    }
    this.container.addChild(this.scene.container);
  }
}
