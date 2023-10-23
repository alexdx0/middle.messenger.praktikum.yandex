import { Block } from "@Core";

import ChatContextPopupHbs from "./ChatContextPopup.hbs";

export class ChatContextPopup extends Block {
  componentDidMount(): void {
    console.log("popup CDM");
  }

  componentWillUnmount(): void {
    console.log(" popup CWU");
    // this._clickOutsideDisposer?.();
  }

  protected render() {
    return ChatContextPopupHbs;
  }
}
