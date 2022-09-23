import * as PIXI from "pixi.js";
import { Background } from "./Background";
import { Platforms } from "./Platforms";
import { Hero } from "./Hero";
import { LabelScore } from "./LabelScore";
import {GameViewEvent} from "../events/GameViewEvent";
import {HeroViewEvent} from "../events/HeroViewEvent";
import {Sound} from "@pixi/sound";

export class MainScene extends PIXI.utils.EventEmitter {

    constructor(game) {
        super();
        this.container = new PIXI.Container();
        this.game = game;

        this.createBackground();
        this.createPlatforms();
        this.createHero();
        this.createUI();

        const sound = Sound.from(PIXI.Loader.shared.resources.music);
        sound.play();

        const ticker = PIXI.Ticker.shared;
        ticker.add((dt) => {
            this.update(dt);
        });
    }

    createUI() {
        this.labelScore = new LabelScore();
        this.container.addChild(this.labelScore);
        this.hero.sprite.on(HeroViewEvent.SCORE, () => {
            this.labelScore.renderScore(this.hero.score);
        });
    }

    createBackground() {
        this.bg = new Background();
        this.container.addChild(this.bg.container);
    }

    createPlatforms() {
        this.platfroms = new Platforms();
        this.container.addChild(this.platfroms.container);
    }

    createHero() {
        this.hero = new Hero();
        this.container.addChild(this.hero.sprite);
        this.container.interactive = true;
        this.container.on("pointerdown", () => {
            this.hero.startJump();
        });
        this.hero.sprite.once(HeroViewEvent.HERO_DIE, () => {
            window.dispatchEvent(new Event(GameViewEvent.HERO_DIE));
        });
    }

    update(dt) {
        this.bg.update(dt);
        this.platfroms.checkCollision(this.hero);
        this.platfroms.update(dt);
        this.hero.update(dt);
    }
}