/* eslint-disable no-unused-expressions */
import { expect } from "chai";
import sinon from "sinon";

import { Block } from "./Block";

interface IComponentProps extends Record<string, unknown> {
  name?: string;
  events?: Record<string, () => void>;
}

const testName = "test name";

describe("Класс Block", () => {
  let GlobalComponent: typeof Block;

  const precompiledHbs = (context?: IComponentProps) => `<div><div id="name">${context?.name}</div></div>`;

  before(() => {
    class ComponentClass extends Block {
      constructor(props: IComponentProps) {
        super({ ...props });
      }

      protected render() {
        return precompiledHbs;
      }
    }

    GlobalComponent = ComponentClass as typeof Block;
  });

  it("Компонент возвращает разметку прекомпилированного шаблона с помощью метода getElement", () => {
    const component = new GlobalComponent();
    const componentText = component.getContent()?.outerHTML;
    expect(componentText).to.eq(precompiledHbs());
  });

  it("Компонент принимает свойство и устанавливает его в шаблон", () => {
    const component = new GlobalComponent({ name: testName } as IComponentProps);
    const componentTitle = component.getContent()?.querySelector("#name")?.innerHTML;
    expect(componentTitle).to.eq(testName);
  });

  it("Компонент добавляет обработчики событий через свойство events", () => {
    const blurHandler = sinon.stub();
    const component = new GlobalComponent({
      events: {
        blur: blurHandler,
      },
    } as IComponentProps);

    const event = new MouseEvent("blur");
    component.getContent()?.dispatchEvent(event);
    expect(blurHandler.calledOnce).to.be.true;
  });

  it("Вызывается перерендер компонента, если его свойства изменились", () => {
    const newName = "test new string";
    const component = new GlobalComponent({ name: testName } as IComponentProps);
    component.setProps({ name: newName } as IComponentProps);
    const componentTitle = component.getContent()?.querySelector("#name")?.innerHTML;
    expect(componentTitle).to.eq(newName);
  });

  it("Событие жизненного цикла ComponentDidMount вызывается после монтирования в DOM",
    () => {
      const clock = sinon.useFakeTimers();
      const component = new GlobalComponent();
      const CDMSpy = sinon.spy(component, "dispatchComponentDidMount");

      const element = component.getContent();
      document.body.append(element!);
      clock.next();
      expect(CDMSpy.calledOnce).to.be.true;
    }
  );

  it("Событие жизненного цикла ComponentWillUnmount сбрасывает обработчики событий компонента",
    () => {
      const clickHandler = sinon.stub();
      const event = new MouseEvent("click");
      const component = new GlobalComponent({
        events: {
          click: clickHandler,
        },
      } as IComponentProps);

      component.dispatchComponentWillUnmount();
      component.getContent()?.dispatchEvent(event);
      expect(clickHandler.calledOnce).to.be.false;
    }
  );
});
