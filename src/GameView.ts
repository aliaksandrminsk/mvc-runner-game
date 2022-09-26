import { GameModel } from "./GameModel";
import * as PIXI from "pixi.js";
import { GameEvents } from "./GameEvents";
import { FinalScene } from "./views/FinalScene";
import { MainScene } from "./views/MainScene";
import { Scene } from "./views/Scene";

export class GameView extends PIXI.utils.EventEmitter {
  private readonly _game: GameModel;

  public container: PIXI.Container;
  public scene: Scene | null = null;

  constructor(game: GameModel) {
    super();
    this._game = game;
    this.container = new PIXI.Container();

    //** Initialization of game.
    this.init();

    //** Listener.
    this.game.on(GameEvents.CHANGE_GAME_SCENE, () => this.setGameState());
  }

  get game(): GameModel {
    return this._game;
  }

  init() {
    this.setGameState();
  }

  setGameState() {
    if (this.scene) {
      this.container.removeChild(this.scene.container);
      this.scene.destroy();
      this.scene = null;
    }
    if (this.game.scene === "main") {
      this.scene = new MainScene(this.game);
    } else if (this.game.scene === "final") {
      this.scene = new FinalScene(this.game);
    }
    if (this.scene) {
      this.container.addChild(this.scene.container);
    }
  }
}
