import { Block } from "@Core";

import ChatContextPopupHbs from "./ChatContextPopup.hbs";

const UseClickOutside = (element: HTMLElement | null, onClickOutside: () => void) => {
  const handler = (e: MouseEvent) => {
    if (!element?.contains(e.target as HTMLElement) && !(e.target as HTMLElement).contains(element)) {
      onClickOutside();
      // console.log("click outside");
    }
  };
  const disposer = () => document.removeEventListener("click", handler);
  document.addEventListener("click", handler);
  return disposer;
};

export class ChatContextPopup extends Block {
  private _clickOutsideDisposer: (() => void) | null = null;
  constructor() {
    super();

    if (!this._clickOutsideDisposer) {
      this._clickOutsideDisposer = UseClickOutside(this.element, () => { });
    }

    // setTimeout(() => {
    //   super.dispatchComponentWillUnmount(this.element!);
    //   // super.dispatchComponentDidMount();
    // }, 2000);
  }

  // componentDidMount(): void {
  //   console.log("component did mount");
  // }

  // componentWillUnmount(): void {
  //   console.log("dispose");
  //   this._clickOutsideDisposer?.();
  // }

  componentWillUnmount(): void {
    console.log(" popup CWU");
  }

  protected render() {
    return ChatContextPopupHbs;
  }
}
