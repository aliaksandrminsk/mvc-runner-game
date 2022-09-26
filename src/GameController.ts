import { GameModel, GameScene } from "./GameModel";
import { GameView } from "./GameView";
import { GameEvents } from "./GameEvents";
import { FinalSceneController } from "./finalScene/FinalSceneController";
import { MainSceneController } from "./mainScene/MainSceneController";
import { MainSceneView } from "./mainScene/MainSceneView";
import { FinalSceneView } from "./finalScene/FinalSceneView";
import { globalEvent } from "@billjs/event-emitter";

export class GameController {
  private readonly gameModel: GameModel;
  private readonly gameView: GameView;

  private finalSceneController: FinalSceneController | null = null;
  private mainSceneController: MainSceneController | null = null;

  constructor(game: GameModel, gameView: GameView) {
    this.gameModel = game;
    this.gameView = gameView;

    //** Add listeners to the GameController.
    globalEvent.on(GameEvents.CHANGE_GAME_SCENE, () => this.setGameState());

    //** Initialization of game.
    this.mainSceneController = new MainSceneController(
      this.gameView.scene as MainSceneView,
      this.gameModel
    );
  }

  //** Set game state.
  protected setGameState() {
    if (this.gameModel.scene === GameScene.MAIN) {
      this.gameModel.score = 0;
      this.gameView.setGameState(GameScene.MAIN);
      if (this.finalSceneController) {
        this.finalSceneController.destroy();
        this.finalSceneController = null;
      }
      this.mainSceneController = new MainSceneController(
        this.gameView.scene as MainSceneView,
        this.gameModel
      );
    } else if (this.gameModel.scene === GameScene.FINAL) {
      this.gameView.setGameState(GameScene.FINAL);
      if (this.mainSceneController) {
        this.mainSceneController.destroy();
        this.mainSceneController = null;
      }
      this.finalSceneController = new FinalSceneController(
        this.gameView.scene as FinalSceneView,
        this.gameModel
      );
    }
  }
}
