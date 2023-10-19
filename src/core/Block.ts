/* eslint-disable no-use-before-define */
import { v4 as makeUUID } from "uuid";

import EventBus, { Listener } from "./EventBus";

export type RefType = {
  [key: string]: Block<BlockPropsType>
}

export type BlockPropsType = Record<string, unknown | Block<BlockPropsType>> &
{ events?: Record<string, () => void> } & object;

type RootChildren = {
  component: Block<BlockPropsType>,
  embed(fragment: DocumentFragment): void;
}

type ContextAndStubsType = BlockPropsType & { "__refs": BlockPropsType } & { "__children"?: RootChildren[] };

// Нельзя создавать экземпляр данного класса
export class Block<Tprops extends BlockPropsType = BlockPropsType, Trefs extends RefType = RefType> {
  static EVENTS = {
    INIT: "init",
    /** ComponentDidMount */
    FLOW_CDM: "flow:component-did-mount",
    /** ComponentDidUpdate */
    FLOW_CDU: "flow:component-did-update",
    /** Render */
    FLOW_RENDER: "flow:render",
    /** ComponentWillUnmount */
    FLOW_CWU: "flow:component-will-unmount",
  };

  public id = makeUUID();
  protected props: Tprops;
  protected refs: Trefs = {} as Trefs;
  public children: Block[] = [];
  private eventBus: () => EventBus;
  protected _element: HTMLElement | null = null;

  constructor(propsWithChildren: Tprops = {} as Tprops) {
    const eventBus = new EventBus();

    const { props } = this._getChildrenAndProps(propsWithChildren);

    // this.children = children as BlockPropsType;
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

    // TODO eliminate children
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
    eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  /** Приватный метод, следящий за удалением экземпляра блока (узла DOM) и запускающий CWU */
  private _makeUnmountObservable(callback: (block: HTMLElement) => void) {
    const parent = this._element?.parentNode;
    if (!parent) { throw new Error("Block instance has no parents") }

    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => mutation.removedNodes.forEach(node => {
        if (node === this._element) {
          observer.disconnect();
          callback(this._element);
        }
      }));
    });
    // const observer = new MutationObserver(mutations => {
    //   for (const mutation of mutations) {
    //     for (const el of mutation.removedNodes) {
    //       console.log("parent", parent);
    //       console.log("this._element", this._element);
    //       console.log("removed node", el);
    //       if (el === this._element) {
    //         observer.disconnect();
    //         callback(this._element);
    //       }
    //     }
    //   }
    // });
    observer.observe(parent, { childList: true });
  }

  private _init() {
    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {
  }

  _componentDidMount() {
    this.componentDidMount();
    this._makeUnmountObservable((element) => this.dispatchComponentWillUnmount(element));
  }

  componentDidMount() {
  }

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    // Object.values(this.children).forEach(child => (child as Block).dispatchComponentDidMount());
  }

  public dispatchComponentWillUnmount(element: HTMLElement) {
    // console.log("block CWU", element);
    this.eventBus().emit(Block.EVENTS.FLOW_CWU);
    Object.values(this.children).forEach(child => (child as Block).dispatchComponentWillUnmount(element));
  }

  private _componentDidUpdate(oldProps: BlockPropsType, newProps: BlockPropsType) {
    if (this.componentShouldUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentShouldUpdate(oldProps: Record<string, unknown>, _newProps: Record<string, unknown>) {
    return oldProps !== _newProps;
  }

  _componentWillUnmount() {
    this.componentWillUnmount();
  }

  componentWillUnmount() {}

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
    // console.log(this.children);

    if (this._element) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();
  }

  private compile(template: HandlebarsTemplateDelegate, context: BlockPropsType) {
    const contextAndStubs: ContextAndStubsType = { ...context, __refs: this.refs };

    const html = template(contextAndStubs);

    // TODO попробовать переделать на фрагмент
    const temp = document.createElement("template");

    temp.innerHTML = html;

    if (contextAndStubs.__children?.length) {
      this.children = contextAndStubs.__children.map(x => x.component);
    }

    contextAndStubs.__children?.forEach(({ embed }: Pick<RootChildren, "embed">) => {
      embed(temp.content);
    });

    return temp.content;
  }

  protected render(): (context?: Record<string, unknown>) => string {
    return () => "";
  }

  getContent() {
    // Хак, чтобы вызвать CDM только после добавления в DOM
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (
          this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
        ) {
          this.dispatchComponentDidMount();
          // this.eventBus().emit(Block.EVENTS.FLOW_CDM);
        }
      }, 100);
    }

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

  // _createDocumentElement(tagName: string) {
  //   // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
  //   return document.createElement(tagName);
  // }

  show() {
    this.getContent()!.style.display = "revert-layer";
  }

  hide() {
    this.getContent()!.style.display = "none";
  }

  remove() {
    const parent = this.element!.parentNode;
    // this.dispatchComponentWillUnmount(this.element!);
    // Object.values(this.children).forEach(child => (child as Block).dispatchComponentWillUnmount(this.element!));
    parent?.removeChild(this.element!);
  }
}
