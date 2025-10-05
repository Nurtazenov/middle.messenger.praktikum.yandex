/* eslint-disable no-undef */
import Block from "../tools/Block.ts";

jest.mock("uuid", () => ({
  v4: jest.fn(() => "mocked-uuid"),
}));

describe("Block", () => {
  let block;

  beforeEach(() => {
    block = new Block({ testProp: "initial" });
  });

  it("следует создать экземпляр блока с идентификатором", () => {
    expect(block.id).toBe("mocked-uuid");
  });

  it("следует правильно хранить реквизит и доставать его", () => {
    expect(block.getProps("testProp")).toBe("initial");

    block.setProps({ testProp: "updated", newProp: 123 });
    expect(block.getProps("testProp")).toBe("updated");
    expect(block.getProps("newProp")).toBe(123);
  });

  it("должен выдавать FLOW_CDU при изменении реквизита через прокси", () => {
    const spy = jest.spyOn(block.eventBus(), "emit");
    block.setProps({ foo: "bar" });
    expect(spy).toHaveBeenCalledWith(
      Block.EVENTS.FLOW_CDU,
      expect.any(Object),
      expect.any(Object)
    );
  });

  it("должен обрабатывать dispatchComponentDidMount", () => {
    const spy = jest.spyOn(block.eventBus(), "emit");
    block.dispatchComponentDidMount();
    expect(spy).toHaveBeenCalledWith(Block.EVENTS.FLOW_CDM);
  });

  it("следует показывать и скрывать элемент", () => {
    const mockElement = document.createElement("div");
    // @ts-ignore
    block["_element"] = mockElement;

    block.show();
    expect(mockElement.style.display).toBe("block");

    block.hide();
    expect(mockElement.style.display).toBe("none");
  });

  it("должен возвращать значение null для элемента перед рендерингом", () => {
    expect(block.element).toBe(null);
    expect(block.getContent()).toBe(null);
  });

  it("следует скомпилировать шаблон с учетом контекста", () => {
    const template = jest.fn((ctx) => `<div>${ctx.foo}</div>`);
    const content = block.compile(template, { foo: "bar" });
    expect(content.firstElementChild?.outerHTML).toBe("<div>bar</div>");
  });

  it("должен регистрироваться и выдавать событие INIT при создании", () => {
  const emitMock = jest.fn();
  const onMock = jest.fn();

  class MockEventBus {
    emit = emitMock;
    on = onMock;
  }

  new Block({}, new MockEventBus());

  expect(emitMock).toHaveBeenCalledWith(Block.EVENTS.INIT);
});

  it("должен защищать реквизит от удаления", () => {
    expect(() => {
      // @ts-ignore
      delete block.props.testProp;
    }).toThrow("Нет доступа");
  });
});
