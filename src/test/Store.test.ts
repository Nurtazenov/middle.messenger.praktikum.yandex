import store, { StoreEvents, withStore } from "../tools/Store";
import Block from "../tools/Block";
import isEqual from "../tools/isEqual";

// мок isEqual (иначе он обычная функция)
jest.mock("../tools/isEqual", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// мок uuid если нужно (Block может его дергать)
jest.mock("uuid", () => ({
  v4: jest.fn(() => "mocked-uuid"),
}));

class TestBlock extends Block {
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
    (store as any).state = {}; // очищаем стейт
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
    (isEqual as jest.Mock).mockReturnValue(false); // по умолчанию — состояния разные
  });

it("должен пробрасывать состояние в компонент при создании", () => {
  const mapStateToProps = jest.fn(() => ({ foo: "bar" }));
  const Wrapped = withStore(mapStateToProps)(TestBlock);

  const component = new Wrapped({ baz: "qux" });

  expect(component.getProps("baz")).toBe("qux");
  expect(component.getProps("foo")).toBe("bar");
  expect(mapStateToProps).toHaveBeenCalledWith(store.getState());
});

  it("должен обновлять props при изменении store", () => {
    const mapStateToProps = jest.fn((state) => ({ value: state.value || null }));
    const Wrapped = withStore(mapStateToProps)(TestBlock);
    const component = new Wrapped({});

    jest.spyOn(component, "setProps");

    store.set("value", 42); // триггерим обновление

    expect(component.setProps).toHaveBeenCalledWith({ value: 42 });
  });

  it("не должен обновлять props если состояние не изменилось", () => {
    (isEqual as jest.Mock).mockReturnValue(true); // состояния одинаковые
    const mapStateToProps = jest.fn(() => ({ test: "same" }));
    const Wrapped = withStore(mapStateToProps)(TestBlock);
    const component = new Wrapped({});

    jest.spyOn(component, "setProps");

    store.set("value", 123);

    expect(component.setProps).not.toHaveBeenCalled();
  });
});
