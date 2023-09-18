import { Block } from "@Core";

import ChatCardHbs from "./ChatCard.hbs";

export class ChatCard extends Block {
  protected render() {
    return ChatCardHbs;
  }
}
