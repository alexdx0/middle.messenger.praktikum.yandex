import { Block } from "@Core";

import MessageInputHbs from "./MessageInput.hbs";

export class MessageInput extends Block {
  private get inputValue() {
    return ((this.refs.message as MessageInput)?._element as HTMLInputElement)?.value;
  }

  public value() {
    return this.inputValue;
  }

  protected render() {
    return MessageInputHbs;
  }
}
