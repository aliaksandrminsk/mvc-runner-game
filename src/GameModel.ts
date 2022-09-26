import * as PIXI from "pixi.js";
import { GameEvents } from "./GameEvents";

export class GameModel extends PIXI.utils.EventEmitter {
  protected _scene: string = "main";
  protected _score: number = 0;

  public set scene(value: string) {
    this._scene = value;
    this.emit(GameEvents.CHANGE_GAME_SCENE);
  }

  public get scene(): string {
    return this._scene;
  }

  public set score(value: number) {
    this._score = value;
    this.emit(GameEvents.CHANGE_SCORE);
  }

  public get score(): number {
    return this._score;
  }
}
