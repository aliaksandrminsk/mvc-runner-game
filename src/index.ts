import { App } from "./App";
import * as PIXI from "pixi.js";

declare global {
  interface Window {
    PIXI: any;
  }
}

window.PIXI = PIXI;
1;
const app = new App();
app.run();
