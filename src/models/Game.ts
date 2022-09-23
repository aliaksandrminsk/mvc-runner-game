import * as PIXI from "pixi.js";
import { GameEvent } from "../events/GameEvent";

export class Game extends PIXI.utils.EventEmitter {

  protected _scene: string = "main";
  protected _screenSize = {width: 0, height: 0};
  public render = null;

  public set scene(value: string) {
    console.log(999888);
    this._scene = value;
    this.emit(GameEvent.CHANGE_GAME_SCENE);
  }

  public get scene(): string {
    return this._scene;
  }

  public set screenSize(value: any) {
    this._screenSize = value;
    //this.emit(GameEvent.RESIZE);
  }

  public get screenSize(): any {
    return this._screenSize;
  }







}
