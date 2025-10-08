/* eslint-disable no-undef */
// /* eslint-disable no-undef */

import { Router, routs } from "../tools/Router.ts";
import  store from "../tools/Store.ts";
import  Route from "../tools/Route.ts";

jest.mock("../tools/Store", () => ({
  __esModule: true,
  default: {
    isUserAuthorized: jest.fn(),
  },
}));

jest.mock("../tools/Route", () => {
  return jest.fn().mockImplementation((pathname, block, rootQuery) => {
    return {
      pathname,
      block,
      rootQuery,
      render: jest.fn(),
      leave: jest.fn(),
     match: jest.fn((path) => path === pathname),
    };
  });
});

describe("Router", () => {
  let router: Router;

  beforeEach(() => {
    router = new Router("#app");
    router.reset();

    (store.isUserAuthorized as jest.Mock).mockReset();
  });

  it("должен регистрировать роут через use()", () => {
    router.use(routs.login, {} as any);

    expect(Route).toHaveBeenCalledWith(routs.login, {}, "#app");
  });

  it("getRoute должен находить зарегистрированный маршрут", () => {
    router.use(routs.login, {} as any);
    const route = router.getRoute(routs.login);

    expect(route).toBeDefined();
  });

  it("go должен пушить в history и вызывать render", () => {
    router.use(routs.messenger, {} as any);

    const route = router.getRoute(routs.messenger)!;
    router.go(routs.messenger);

    expect(window.location.pathname).toBe(routs.messenger);
    expect(route.render).toHaveBeenCalled();
  });

  it("если авторизован и идёт на login → редирект на messenger", () => {
    (store.isUserAuthorized as jest.Mock).mockReturnValue(true);

    router.use(routs.login, {} as any);
    router.use(routs.messenger, {} as any);

    const messengerRoute = router.getRoute(routs.messenger)!;
    router.go(routs.login);

    expect(messengerRoute.render).toHaveBeenCalled();
  });

  it("если роут не найден → должен отрендерить error", () => {
    router.use(routs.error, {} as any);

    const errorRoute = router.getRoute(routs.error)!;
    router.go("/unknown");

    expect(errorRoute.render).toHaveBeenCalled();
  });

  it("reset должен очищать роуты и текущий маршрут", () => {
    router.use(routs.login, {} as any);
    router.go(routs.login);

    router.reset();

    expect(router.getRoute(routs.login)).toBeUndefined();
  });
});

