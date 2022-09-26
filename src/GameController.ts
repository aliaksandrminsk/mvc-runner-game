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
    // globalEvent.on(GameEvents.HERO_DIE, () => this.loseGame());
    // globalEvent.on(GameEvents.FINAL_SCENE_CLICKED, () => this.startGame());
    // globalEvent.on(GameEvents.DIAMOND_COLLECT, () => this.collectDiamond());

    globalEvent.on(GameEvents.CHANGE_GAME_SCENE, () => this.setGameState());

    //** Initialization of game.
    this.mainSceneController = new MainSceneController(
      this.gameView.scene as MainSceneView,
      this.gameModel
    );
  }

  //** Set state when user play a game.
  // protected startGame() {
  //this.gameModel.score = 0;
  //this.gameModel.scene = GameScene.MAIN;
  // this.gameView.setGameState(this.gameModel.scene);
  // if (this.finalSceneController) {
  //   this.finalSceneController.destroy();
  //   this.finalSceneController = null;
  // }
  // this.mainSceneController = new MainSceneController(
  //   this.gameView.scene as MainSceneView,
  //   this.gameModel
  // );
  //}

  //** Set state of lose game.
  // protected loseGame() {
  //this.gameModel.scene = GameScene.FINAL;
  // this.gameView.setGameState(this.gameModel.scene);
  // if (this.mainSceneController) {
  //   this.mainSceneController.destroy();
  //   this.mainSceneController = null;
  // }
  // this.finalSceneController = new FinalSceneController(
  //   this.gameView.scene as FinalSceneView,
  //   this.gameModel
  // );
  //}

  //** Collect diamond.
  // protected collectDiamond() {
  //   this.gameModel.score++;
  // }

  protected setGameState() {
    console.log("setGameState");
    if (this.gameModel.scene === GameScene.MAIN) {
      console.log("setGameState main");

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
