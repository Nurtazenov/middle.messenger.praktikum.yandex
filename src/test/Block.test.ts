import Block from "../tools/Block";

jest.mock("uuid", () => ({
  v4: jest.fn(() => "mocked-uuid"),
}));

describe("Block", () => {
  let block: Block;

  beforeEach(() => {
    block = new Block({ testProp: "initial" });
  });

  it("should create a Block instance with an id", () => {
    expect(block.id).toBe("mocked-uuid");
  });

  it("should store props and get them correctly", () => {
    expect(block.getProps("testProp")).toBe("initial");

    block.setProps({ testProp: "updated", newProp: 123 });
    expect(block.getProps("testProp")).toBe("updated");
    expect(block.getProps("newProp")).toBe(123);
  });

  it("should emit FLOW_CDU on props change via proxy", () => {
    const spy = jest.spyOn(block.eventBus(), "emit");
    block.setProps({ foo: "bar" });
    expect(spy).toHaveBeenCalledWith(
      Block.EVENTS.FLOW_CDU,
      expect.any(Object),
      expect.any(Object)
    );
  });

  it("should handle dispatchComponentDidMount", () => {
    const spy = jest.spyOn(block.eventBus(), "emit");
    block.dispatchComponentDidMount();
    expect(spy).toHaveBeenCalledWith(Block.EVENTS.FLOW_CDM);
  });

  it("should show and hide element", () => {
    const mockElement = document.createElement("div");
    // @ts-ignore
    block["_element"] = mockElement;

    block.show();
    expect(mockElement.style.display).toBe("block");

    block.hide();
    expect(mockElement.style.display).toBe("none");
  });

  it("should return null for element before render", () => {
    expect(block.element).toBe(null);
    expect(block.getContent()).toBe(null);
  });

  it("should compile template with context", () => {
    const template = jest.fn((ctx) => `<div>${ctx.foo}</div>`);
    const content = block.compile(template, { foo: "bar" });
    expect(content.firstElementChild?.outerHTML).toBe("<div>bar</div>");
  });

  it("should register and emit INIT event on creation", () => {
  const emitMock = jest.fn();
  const onMock = jest.fn();

  class MockEventBus {
    emit = emitMock;
    on = onMock;
  }

  new Block({}, new MockEventBus() as any);

  expect(emitMock).toHaveBeenCalledWith(Block.EVENTS.INIT);
});

  it("should protect props from delete", () => {
    expect(() => {
      // @ts-ignore
      delete block.props.testProp;
    }).toThrow("Нет доступа");
  });
});
