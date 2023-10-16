import EventBus from "@Core/EventBus";
import { AppStoreModel } from "@models/AppStoreModel";

export enum StoreEvents {
  Updated = "Updated"
}

class AppStore extends EventBus {
  private state: AppStoreModel = {} as AppStoreModel;

  constructor(defaultState?: AppStoreModel) {
    super();

    if (defaultState) {
      this.state = defaultState;
      this.set(defaultState);
    }
  }

  public getState() {
    return this.state;
  }

  public set(nextState: Partial<AppStoreModel>) {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };

    this.emit(StoreEvents.Updated, prevState, nextState);
    // TODO debug
    console.log("AppStore:", this.state);
  }
}

const instance = new AppStore();
window.appStore = instance;
export { instance as AppStore };
