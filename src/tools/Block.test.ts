import { expect } from "chai";
import sinon from "sinon"
import Block from "./Block";
import EventBus from "./EventBus";

describe("Block", () => {
    let example:Block;
    let eventBus: sinon.SinonStubbedInstance<EventBus>;

    beforeEach(() => {
        eventBus = sinon.createStubInstance(EventBus);
        example = new Block({}, eventBus);
    })
    afterEach(() => {
        sinon.restore();
    });

    describe("Инициализация", () => {
        it("Должен инициализироваться с уникальным id", () =>{
            expect(example.id).to.be.a("string");
        });
        it("Должен отправить INIT событие при создании", () =>{
            expect(eventBus.emit.calledWith(Block.EVENTS.INIT)).to.be.true;
        });
    });
    describe("props", () => {
        it("Должен обновить props и выхвать FLOW_CDU событие", () => {
            const newProps = {newKey: "newValue"};
            example.setProps(newProps);

            expect(example.getProps("newKey")).to.equal("newValue");
            expect(eventBus.emit.calledWith(Block.EVENTS.FLOW_CDU)).to.be.true;
        });
    });
    describe("Компонент жизненный цикл", () =>{
        it("Должен вызывать событие FLOW_RENDER при инициализации", () => {
            example["_init"]();
            expect(eventBus.emit.calledWith(Block.EVENTS.FLOW_RENDER)).to.be.true;
        });
        it("dispatchComponentDidMount должен вызывать FLOW_CDM",() =>{
            example.dispatchComponentDidMount();
            expect(eventBus.emit.calledWith(Block.EVENTS.FLOW_CDM)).to.be.true;
        });
        it("Должен вызывать componentDidUpdate и FLOW_RENDER при обновлении", () => {
            const componentDidUpdateSpy = sinon.spy(example, "componentDidUpdate");
            example["_componentDidUpdate"]();
            expect(componentDidUpdateSpy.calledOnce).to.be.true;
            expect(eventBus.emit.calledWith(Block.EVENTS.FLOW_RENDER)).to.be.true;
        });
    });
    describe("Манипуляция с элементами", () => {
        it("Должен показать элемент, установив display в block", () => {
            const getContentStub = sinon.stub(example, "Получить контакт").returns(document.createElement("div"));
            example.show();
            const element = getContentStub();

            if(element){
                expect(element.style.display).to.equal("block");
            }
        });
        it("Должен скрыть элемент, установив display = none", () =>{
        const getContent = sinon.stub(example,"Получить контент").returns(document.createElement("div"));
        example.hide();
        const element = getContent();

        if(element){
            expect(element.style.display).to.equal("none");
        }
        });
    });

    describe("Обращение к событию",() => {
        it("Должен добавлять события из props", () => {
            const clickHandler = sinon.spy();
            const block = new Block({
                events:{click:clickHandler}
            });
            const element = document.createElement("div");
            block["_element"] = element;
            block["_addEvents"]();
            element.click();

            expect(clickHandler.calledOnce).to.be.true;
        });
        it("Должен удалять события из props", () => {
  const clickHandler = sinon.spy();
      const block = new Block({ events: { click: clickHandler } });
      const element = document.createElement("div");

      block["_element"] = element;
      block["_addEvents"]();
      block["_removeEvents"]();
      element.click();

      expect(clickHandler.called).to.be.false;
        })
    })
})
