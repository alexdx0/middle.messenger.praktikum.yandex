/* eslint-disable no-use-before-define */
import { v4 as makeUUID } from "uuid";

import EventBus, { Listener } from "./EventBus";

type BlockPropsType = Record<string, unknown | Block<BlockPropsType>> &
{ events?: Record<string, () => void> } & object;

type RootChildren = {
  component: Block<BlockPropsType>,
  embed(fragment: DocumentFragment): void;
}

type ContextAndStubsType = BlockPropsType & { "__refs": BlockPropsType } & { "__children"?: RootChildren[] };

// Нельзя создавать экземпляр данного класса
export class Block<Tprops extends BlockPropsType = BlockPropsType> {
  static EVENTS = {
    INIT: "init",
    /** ComponentDidMount */
    FLOW_CDM: "flow:component-did-mount",
    /** ComponentDidUpdate */
    FLOW_CDU: "flow:component-did-update",
    /** Render */
    FLOW_RENDER: "flow:render",
  };

  public id = makeUUID();
  protected props: Tprops;
  protected refs: Record<string, Block> = {};
  public children: BlockPropsType;
  private eventBus: () => EventBus;
  protected _element: HTMLElement | null = null;

  constructor(propsWithChildren: Tprops = {} as Tprops) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildrenAndProps(propsWithChildren);

    this.children = children as BlockPropsType;
    this.props = this._makePropsProxy(props) as Tprops;

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildrenAndProps(childrenAndProps: BlockPropsType) {
    const props: BlockPropsType = {} as BlockPropsType;
    const children: Record<string, Block> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, children };
  }

  /** Метод добавления обработчиков на события, перереданные блоку через props.events */
  _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach(eventName => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  /** Метод удаления обработчиков с события, перереданных блоку через props.events */
  _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach(eventName => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this) as Listener<unknown[]>);
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _init() {
    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {
  }

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach(child => (child as Block).dispatchComponentDidMount());
  }

  private _componentDidUpdate(oldProps: BlockPropsType, newProps: BlockPropsType) {
    if (this.componentShouldUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentShouldUpdate(oldProps: Record<string, unknown>, _newProps: Record<string, unknown>) {
    return oldProps !== _newProps;
  }

  setProps = (nextProps: Record<string, unknown>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const fragment = this.compile(this.render(), this.props);
    const newElement = fragment.firstElementChild as HTMLElement;

    this._removeEvents();

    if (this._element) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();
  }

  private compile(template: HandlebarsTemplateDelegate, context: BlockPropsType) {
    const contextAndStubs: ContextAndStubsType = { ...context, __refs: this.refs };

    const html = template(contextAndStubs);

    const temp = document.createElement("template");

    temp.innerHTML = html;

    contextAndStubs.__children?.forEach(({ embed }: Pick<RootChildren, "embed">) => {
      embed(temp.content);
    });

    return temp.content;
  }

  protected render(): (context?: Record<string, unknown>) => string {
    return () => "";
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy = (props: BlockPropsType) => {
    return new Proxy(props, {
      get: (target, prop: string) => {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set: (target, prop: string, value) => {
        const oldTarget = { ...target };

        target[prop] = value;

        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty: () => {
        throw new Error("Нет доступа");
      },
    });
  };

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    this.getContent()!.style.display = "block";
  }

  hide() {
    this.getContent()!.style.display = "none";
  }
}
