import * as PIXI from "pixi.js";
//import { Globals } from "../scripts/Globals";
import { Background } from "./Background";
import { Platforms } from "./Platforms";
import { Hero } from "./Hero";
import { LabelScore } from "./LabelScore";
import {GameViewEvent} from "../events/GameViewEvent";

export class MainScene extends PIXI.utils.EventEmitter {

    constructor(game) {
        super();
        this.container = new PIXI.Container();
        // Globals.resources.music.sound.play({
        //     loop: true,
        //     volume: 0.2
        // });
        this.game = game;

        this.createBackground();
        this.createPlatforms();
        this.createHero();
        this.createUI();

        const ticker = PIXI.Ticker.shared;
        ticker.add((dt) => {
            this.update(dt);
        });
    }

    createUI() {
        this.labelScore = new LabelScore();
        this.container.addChild(this.labelScore);
        this.hero.sprite.on("score", () => {
            this.labelScore.renderScore(this.hero.score);
        });
    }

    createBackground() {
        this.bg = new Background();
        this.container.addChild(this.bg.container);
    }

    createPlatforms() {
        this.platfroms = new Platforms(this.game);
        this.container.addChild(this.platfroms.container);
    }

    createHero() {
        this.hero = new Hero(this.game);
        this.container.addChild(this.hero.sprite);
        this.container.interactive = true;
        this.container.on("pointerdown", () => {
            this.hero.startJump();
        });
        this.hero.sprite.once("die", () => {
            window.dispatchEvent(new Event(GameViewEvent.HERO_DIE));
           // this.emit(GameViewEvent.HERO_DIE);
        });
    }

    update(dt) {
        this.bg.update(dt);
        this.platfroms.checkCollision(this.hero);
        this.platfroms.update(dt);
        this.hero.update(dt);
    }
}