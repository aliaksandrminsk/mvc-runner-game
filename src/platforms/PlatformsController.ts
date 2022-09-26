import { globalEvent, Event } from "@billjs/event-emitter";
import { PlatformsEvents } from "./PlatformsEvents";
import { PlatformsView } from "./PlatformsView";

export class PlatformsController {
  protected view: PlatformsView;
  boundHidePlatform = (e: Event) => this.hidePlatformHandler(e);

  constructor(view: PlatformsView) {
    this.view = view;
    globalEvent.on(PlatformsEvents.PLATFORM_HIDDEN, this.boundHidePlatform);
  }

  protected hidePlatformHandler(e: Event) {
    for (const platform of this.view.platforms) {
      if (platform.container === e.data) {
        this.view.platforms = this.view.platforms.filter(
          (item) => item !== platform
        );
        platform.container.destroy();
      }
    }
  }

  destroy() {
    globalEvent.off(PlatformsEvents.PLATFORM_HIDDEN, this.boundHidePlatform);
  }
}
