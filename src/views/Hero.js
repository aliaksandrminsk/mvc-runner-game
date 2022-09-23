import * as PIXI from "pixi.js";
import {Texture} from "@pixi/core";
import {constants} from "../constants";
import {GameViewEvent} from "../events/GameViewEvent";
//import { Globals } from "../scripts/Globals";

export class Hero {
    constructor(game) {
        this.score = 0;
        this.dy = 0;
        this.jumpIndex = 0;
        this.platform = null;
        this._game = game;

        this.sprite = new PIXI.AnimatedSprite([
            Texture.from("walk1"),
            Texture.from("walk2")
        ]);
        this.sprite.x = 100;
        this.sprite.y = 100;
        this.sprite.loop = true;
        this.sprite.animationSpeed = 0.1;
        this.sprite.play();
    }

    collectDiamond() {
        ++this.score;
        this.sprite.emit("score");
    }

    startJump() {
        if (this.platform || this.jumpIndex === 1) {
            ++this.jumpIndex;
            this.platform = null;
            this.dy = -18;
        }
    }

    get left() {
        return this.sprite.x;
    }

    get right() {
        return this.left + this.sprite.width;
    }

    get top() {
        return this.sprite.y;
    }

    get bottom() {
        return this.top + this.sprite.height;
    }

    get nextbottom() {
        return this.bottom + this.dy;
    }

    stayOnPlatform(platform) {
        this.platform = platform;
        this.dy = 0;
        this.jumpIndex = 0;
        this.sprite.y = platform.top - this.sprite.height;
    }

    moveByPlatform(platform) {
        this.sprite.x = platform.nextleft - this.sprite.width;
    }

    update(dt) {
        if (!this.platform) {
            ++this.dy;
            this.sprite.y += this.dy;
        }

        //if (this.sprite.y > window.innerHeight) {
        if (this.sprite.y > constants.GAME_AREA_SIZE_S) {
           // window.dispatchEvent(new Event(GameViewEvent.HERO_DIE));
            this.sprite.emit("die");
        }
    }
}