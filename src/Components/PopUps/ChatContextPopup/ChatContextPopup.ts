import { Block } from "@Core";

import ChatContextPopupHbs from "./ChatContextPopup.hbs";

export class ChatContextPopup extends Block {
  protected render() {
    return ChatContextPopupHbs;
  }
}
