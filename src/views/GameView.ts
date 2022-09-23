import { Game } from "../models/Game";
import * as PIXI from "pixi.js";
//import { Container } from "pixi.js";
//import * as utils from "@pixi/utils";
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

    //** Background
    //this.bg = new Sprite(Texture.from(game.backgroundTexture));
    //this.container.addChild(this.bg);

    //** Puzzle grid.
   // this._gridView = new GridView(this._game.grid);
    //this.container.addChild(this.gridView.container);

    //** Title
    // const title = new Text("Puzzle Game", {
    //   fontFamily: "Arial",
    //   fontSize: 50,
    //   fontWeight: "600",
    //   fill: 0x0010ff,
    //   align: "center",
    // });
    // this.container.addChild(title);
    // title.pivot.set(title.width / 2, title.height / 2);
    // title.position.set(this.bg.width / 2, 200);

    //** Initialization of game.
    this.init();

    //** Listener.
    this.game.on(GameModelEvent.CHANGE_GAME_SCENE, () => this.setGameState());
  }

  get game(): Game {
    return this._game;
  }


  init() {
    //this.game.scene = "main";
    this.setGameState();



    //console.log( this.container.height);

    // this.gridView.create();
    // this.gridView.container.x =
    //   this.container.width / 2 - this.gridView.container.width / 2;
    // this.gridView.container.y =
    //   this.container.height / 2 - this.gridView.container.height / 2;
    //
    // const modalWindow = this.showInstructionWindow();
    // modalWindow.once(ModalWindowViewEvent.BUTTON_CLICKED, () => {
    //   this.emit(GameViewEvent.START_BUTTON_CLICKED);
    // });
  }

  setGameState() {
     if (this.scene) {
       console.log(1234);
       this.container.removeChild(this.scene.container)
       this.scene.container.destroy();
       this.scene = null;
     }
    if (this.game.scene === "main") {

      this.scene = new MainScene(this.game);
    } else if (this.game.scene === "final") {
      this.scene = new FinalScene();
    }
    this.container.addChild(this.scene.container);
  }




  //** Show instruction modal window.
  // showInstructionWindow(): ModalWindow {
  //   this.modalWindow = new InstructionWindow();
  //   this.container.addChild(this.modalWindow.view);
  //   return this.modalWindow;
  // }
  //
  // //** Show losing modal window.
  // showLosingWindow(): ModalWindow {
  //   this.modalWindow = new LosingWindow();
  //   this.container.addChild(this.modalWindow.view);
  //   return this.modalWindow;
  // }
  //
  // //** Show win modal window.
  // showWinWindow() {
  //   this.modalWindow = new WinWindow();
  //   this.container.addChild(this.modalWindow.view);
  // }
  //
  // //** Hide modal window.
  // hideWindow() {
  //   if (this.modalWindow) {
  //     this.container.removeChild(this.modalWindow.view);
  //     this.modalWindow.destroy();
  //   }
  // }
}
