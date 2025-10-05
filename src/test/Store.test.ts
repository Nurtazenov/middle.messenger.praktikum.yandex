/* eslint-disable no-undef */
import store, { StoreEvents, withStore } from "../tools/Store.ts";
import Block from "../tools/Block.ts";
import isEqual from "../tools/isEqual.ts";

jest.mock("../tools/isEqual", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("uuid", () => ({
  v4: jest.fn(() => "mocked-uuid"),
}));

class TestStore extends Block {
  constructor(props: any) {
    super(props);
  }
}
beforeEach(() => {
  (store as any).state = {};
  store.on(StoreEvents.Updated, jest.fn());
});
describe("Store", () => {
  beforeEach(() => {
    (store as any).state = {}; 
    jest.clearAllMocks();
  });

  it("должен устанавливать и получать состояние", () => {
    store.set("user", { id: 1, login: "test" });
    const state = store.getState();

    expect(state.user).toEqual({ id: 1, login: "test" });
  });

  it("должен эмитить событие Updated при set()", () => {
    const listener = jest.fn();
    store.on(StoreEvents.Updated, listener);

    store.set("user", { id: 2, login: "tester" });

    expect(listener).toHaveBeenCalled();
  });

  it("isUserAuthorized должен возвращать true/false", () => {
    expect(store.isUserAuthorized()).toBe(false);

    store.set("user", { id: 3, login: "authUser" });
    expect(store.isUserAuthorized()).toBe(true);
  });
});

describe("withStore HOC", () => {
  beforeEach(() => {
    (store as any).state = {};
    (isEqual as jest.Mock).mockReturnValue(false);
  });

it("должен пробрасывать состояние в компонент при создании", () => {
  const mapStateToProps = jest.fn(() => ({ foo: "bar" }));
  const Wrapped = withStore(mapStateToProps)(TestStore);

  const component = new Wrapped({ baz: "qux" });

  expect(component.getProps("baz")).toBe("qux");
  expect(component.getProps("foo")).toBe("bar");
  expect(mapStateToProps).toHaveBeenCalledWith(store.getState());
});

  it("должен обновлять props при изменении store", () => {
    const mapStateToProps = jest.fn((state) => ({ value: state.value || null }));
    const Wrapped = withStore(mapStateToProps)(TestStore);
    const component = new Wrapped({});

    jest.spyOn(component, "setProps");

    store.set("value", 42); 

    expect(component.setProps).toHaveBeenCalledWith({ value: 42 });
  });

  it("не должен обновлять props если состояние не изменилось", () => {
    (isEqual as jest.Mock).mockReturnValue(true); 
    const mapStateToProps = jest.fn(() => ({ test: "same" }));
    const Wrapped = withStore(mapStateToProps)(TestStore);
    const component = new Wrapped({});

    jest.spyOn(component, "setProps");

    store.set("value", 123);

    expect(component.setProps).not.toHaveBeenCalled();
  });
});
