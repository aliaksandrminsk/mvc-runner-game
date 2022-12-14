import { GameModel, GameScene } from "./GameModel";
import { GameView } from "./GameView";
import { GameEvents } from "./GameEvents";
import { FinalSceneController } from "./finalScene/FinalSceneController";
import { MainSceneController } from "./mainScene/MainSceneController";
import { MainSceneView } from "./mainScene/MainSceneView";
import { FinalSceneView } from "./finalScene/FinalSceneView";
import { globalEvent } from "@billjs/event-emitter";
import { GameConstants } from "./GameConstants";
import { AbstractRenderer } from "pixi.js";

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

  // Resize game.
  resize(renderer: AbstractRenderer) {
    let h = GameConstants.GAME_AREA_HEIGHT;
    let w = GameConstants.GAME_AREA_WIDTH;

    let heightRatio = 1,
      widthRation = 1;
    if (w > document.body.clientWidth) {
      widthRation = w / document.body.clientWidth;
    }
    if (h > document.body.clientHeight) {
      heightRatio = h / document.body.clientHeight;
    }
    if (widthRation > heightRatio) {
      h = h / widthRation;
      w = w / widthRation;
    } else {
      h = h / heightRatio;
      w = w / heightRatio;
    }
    renderer.view.style.width = w + "px";
    renderer.view.style.height = h + "px";
  }
}
