import EventBus from "@Core/EventBus";
import { AppStoreModel } from "@models/AppStoreModel";

export enum StoreEvents {
  Updated = "Updated"
}

class AppStore extends EventBus {
  private _state: AppStoreModel = {} as AppStoreModel;

  constructor() {
    super();
    this.init();
  }

  /** Инициализяция стора приложения */
  public init() {
    this._init();
  }

  /** Очистка стора приложения */
  public clear() {
    this._clear();
  }

  private _init() {
    if (!window.appStore) {
      const sessionAppState = sessionStorage.getItem("appState");
      const state = sessionAppState ? JSON.parse(sessionAppState) as AppStoreModel : new AppStoreModel();
      this._state = state;
      window.appStore = this;
      sessionStorage.setItem("appState", JSON.stringify(this._state));
    }
  }

  private _clear() {
    if (window.appStore) {
      const emptyStore = new AppStoreModel();
      this._state = emptyStore;
      window.appStore.set(emptyStore);
      sessionStorage.setItem("appState", JSON.stringify(emptyStore));
    }
  }

  public getState() {
    return this._state;
  }

  public set(nextState: Partial<AppStoreModel>) {
    const prevState = { ...this._state };

    this._state = { ...this._state, ...nextState };

    this.emit(StoreEvents.Updated, prevState, nextState);

    sessionStorage.setItem("appState", JSON.stringify(this._state));
  }
}

const instance = new AppStore();
export { instance as AppStore };
