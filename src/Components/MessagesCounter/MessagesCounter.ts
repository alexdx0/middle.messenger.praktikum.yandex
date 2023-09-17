import { Block } from "@Core";

import MessagesCounterHbs from "./MessagesCounter.hbs";

export class MessagesCounter extends Block {
  protected render() {
    return MessagesCounterHbs;
  }
}
