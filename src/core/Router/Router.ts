/* eslint-disable no-use-before-define */
// import { Block, Route } from "@Core";
// eslint-disable-next-line no-restricted-imports
import { Route } from "../Route";
// eslint-disable-next-line no-restricted-imports
import { Block } from "../Block";

export class Router {
  static __instance: Router;
  private routes: Route[] = [];
  private history = window.history;
  private _currentRoute: Route | null = null;
  private _rootQuery: string = "";

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname)) ?? null;
  }

  use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  start() {
    // Реагируем на изменения в адресной строке и вызываем перерисовку
    window.onpopstate = () => {
      this._onRoute(document.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route?.render(this.history.state);
  }

  go(pathname: string, state: Record<string, unknown> = {}) {
    this.history.pushState(state, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }
}
