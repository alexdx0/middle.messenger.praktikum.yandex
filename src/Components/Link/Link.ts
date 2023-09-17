import { Block } from "@Core";

import LinkHbs from "./Link.hbs";

export class Link extends Block {
  protected render() {
    return LinkHbs;
  }
}
