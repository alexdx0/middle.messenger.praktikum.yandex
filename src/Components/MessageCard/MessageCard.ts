import { Block } from "@Core";

import MessageCardHbs from "./MessageCard.hbs";

export class MessageCard extends Block {
  protected render() {
    return MessageCardHbs;
  }
}
