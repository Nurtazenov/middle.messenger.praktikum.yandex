
import Block from "./Block.ts";
import { expect } from "chai";
import sinon from "sinon";

import { describe, beforeEach, it } from "node:test";
import { Router, router, routs } from "./Router.ts";

const getContentFake = sinon.fake.returns(document.createElement("div"));
const BlockMock = class {
  getContent = getContentFake;
} as unknown as typeof Block;

const BlockMock2 = class {
  getContent = sinon.fake.returns(document.createElement("p"));
} as unknown as typeof Block;

describe("Router", () => {
  beforeEach(() => {
    router.reset();
  });

  it("Метод _onRoute() рендерит страницу 404 при несуществующем маршруте", () => {
    const router = Router;
    const errorContentFake = sinon.fake.returns(document.createElement("p"));

    const BlockMockError = class {
      getContent = errorContentFake;
    } as unknown as typeof Block;

    router.use("/route1", BlockMock);
    router.use(routs.error, BlockMockError);

    router.go("/non-existent-route");

    const notFoundRoute = router.getRoute(routs.error);
    expect(notFoundRoute).to.not.be.undefined;
    expect(errorContentFake.callCount).to.eq(1);
  });

  it("Метод go() обновляет историю и вызывает _onRoute()", () => {
    const router = Router;
    const onRouteSpy = sinon.spy(router as any, "_onRoute");
    router.use("/route1", BlockMock);

    router.go("/route1");
    expect(window.location.pathname).to.eq("/route1");
    expect(onRouteSpy.calledOnceWith("/route1")).to.be.true;
  });

  it("Метод Router является синглтоном", () => {
    const router1 = Router;
    const router2 = Router;

    expect(router1).to.eq(router2);
  });

  it("Методы back() и forward() изменяют текущий маршрут", async () => {
    const router = Router;
    router.use("/route1", BlockMock);
    router.use("/route2", BlockMock2);
  
    router.go("/route1");
    router.go("/route2");
  
    await new Promise(resolve => setTimeout(resolve, 50));
    router.back();
  
    await new Promise(resolve => setTimeout(resolve, 50));
    expect(window.location.pathname).to.eq("/route1");
  
    router.forward();
  
    await new Promise(resolve => setTimeout(resolve, 50));
    expect(window.location.pathname).to.eq("/route2");
  });
  

  it("Метод getRoute() возвращает правильный маршрут по pathname", () => {
    const router = Router;
    router.use("/route1", BlockMock);

    const route: string | any = router.getRoute("/route1");
    expect(route).to.not.be.undefined;
    expect(route?.match("/route1")).to.be.true;
  });
});


