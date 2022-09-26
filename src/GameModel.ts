import { GameEvents } from "./GameEvents";
import { globalEvent } from "@billjs/event-emitter";

export class GameModel {
  protected _scene: GameScene = GameScene.MAIN;
  protected _score: number = 0;

  public set scene(value: GameScene) {
    this._scene = value;
    globalEvent.fire(GameEvents.CHANGE_GAME_SCENE);
  }

  public get scene(): GameScene {
    return this._scene;
  }

  public set score(value: number) {
    this._score = value;
    globalEvent.fire(GameEvents.CHANGE_SCORE);
  }

  public get score(): number {
    return this._score;
  }
}

export enum GameScene {
  MAIN,
  FINAL,
}
