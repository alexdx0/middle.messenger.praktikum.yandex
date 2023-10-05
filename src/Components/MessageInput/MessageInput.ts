import { Block } from "@Core";

import MessageInputHbs from "./MessageInput.hbs";

export class MessageInput extends Block {
  protected render() {
    return MessageInputHbs;
  }
}
