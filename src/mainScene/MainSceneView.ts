import { BackgroundView } from "../common/BackgroundView";
import { PlatformsView } from "../platforms/PlatformsView";
import { HeroView } from "./HeroView";
import { LabelScoreView } from "../common/LabelScoreView";
import { SceneView } from "../common/SceneView";

export class MainSceneView extends SceneView {
  public hero: HeroView;
  public platforms: PlatformsView;
  protected bg: BackgroundView;
  protected labelScore: LabelScoreView;

  constructor() {
    super();

    //** Create background.
    this.bg = new BackgroundView();
    this.container.addChild(this.bg.container);

    //** Create platforms.
    this.platforms = new PlatformsView();
    this.container.addChild(this.platforms.container);

    //** Create labelScore.
    this.labelScore = new LabelScoreView();
    this.container.addChild(this.labelScore);

    //** Create hero.
    this.hero = new HeroView();
    this.container.addChild(this.hero.sprite);
    this.container.interactive = true;
  }

  setScoreValue(value: number) {
    if (this.labelScore) {
      this.labelScore.renderScore(value);
    }
  }

  update(dt: number) {
    if (this.bg) this.bg.update(dt);
    if (this.platforms) {
      if (this.hero) this.platforms.checkCollision(this.hero);
      this.platforms.update();
    }
    if (this.hero) this.hero.update();
  }
}
