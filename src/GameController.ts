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

    fgfg gfdgfdg

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
      if (this.finalSceneController) {
        this.finalSceneController.destroy();
        this.finalSceneController = null;
      }
      this.gameView.setScene(GameScene.MAIN);
      this.mainSceneController = new MainSceneController(
        this.gameView.scene as MainSceneView,
        this.gameModel
      );
    } else if (this.gameModel.scene === GameScene.FINAL) {
      if (this.mainSceneController) {
        this.mainSceneController.destroy();
        this.mainSceneController = null;
      }
      this.gameView.setScene(GameScene.FINAL);
      this.finalSceneController = new FinalSceneController(
        this.gameView.scene as FinalSceneView,
        this.gameModel
      );
    }
  }
}
