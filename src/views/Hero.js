import * as PIXI from "pixi.js";
import {constants} from "../constants";
import {HeroViewEvent} from "../events/HeroViewEvent";

export class Hero {
    constructor() {
        this.score = 0;
        this.dy = 0;
        this.jumpIndex = 0;
        this.platform = null;

        this.sprite = new PIXI.AnimatedSprite([
            PIXI.Texture.from("walk1"),
            PIXI.Texture.from("walk2")
        ]);
        this.sprite.x = 100;
        this.sprite.y = 100;
        this.sprite.loop = true;
        this.sprite.animationSpeed = 0.1;
        this.sprite.play();
    }

    collectDiamond() {
        ++this.score;
        window.dispatchEvent(new Event(HeroViewEvent.DIAMOND_COLLECT));
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

    update() {
        if (!this.platform) {
            ++this.dy;
            this.sprite.y += this.dy;
        }

        if (this.sprite.y > constants.GAME_AREA_SIZE_S) {
            this.sprite.emit(HeroViewEvent.HERO_DIE);
        }
    }
}