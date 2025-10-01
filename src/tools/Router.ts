
import Block from "./Block";
import Route from "./Route";
import store from "./Store";
export class Router {
  static back() {
      throw new Error("Method not implemented.");
  }
  static forward() {
      throw new Error("Method not implemented.");
  }
  static getRoute(error: string) {
      throw new Error("Method not implemented.");
  }
  static go(arg_0: string) {
      throw new Error("Method not implemented.");
  }
  static use(arg_0: string, Block_Mock: typeof Block) {
      throw new Error("Method not implemented.");
  }
  static reset() {
      throw new Error("Method not implemented.");
  }
  private static __instance?: Router;
  private routes: Route[] = [];
  private currentRoute: Route | null = null;
  private history = window.history;

  constructor(private readonly rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];

    Router.__instance = this;
  }

  public use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, this.rootQuery);
    this.routes.push(route);

    return this;
  }

  public reset() {
    const instance = Router.__instance;
    if (instance) {
      instance.routes = [];
      instance.currentRoute = null;
      instance.history.replaceState({}, "", "/");
    }
  }

  public start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;
      this._onRoute(target.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const isAuthRoute = [routs.login, routs.signUp].includes(pathname);
  if (store.isUserAuthorized() && isAuthRoute) {
    this.go(routs.messenger);
    return;
  }
    const route = this.getRoute(pathname);
    if (!route) {
      const notFoundRoute = this.getRoute(routs.error);
      notFoundRoute?.render();
      return;
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;
    route.render();
  }


  public go(pathname: string) {
    this.history.pushState({}, "", pathname);

    this._onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }
  public getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}
export const router = new Router("#app")
export const routs ={
  login: "/",
  signUp:"/sign-up",
  messenger:"/messenger",
  settings:"/settings",
  error:"/error"
}
