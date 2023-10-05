import { Block } from "@Core";

import ErrorPageHbs from "./ErrorPage.hbs";

export class ErrorPage extends Block {
  protected render() {
    return ErrorPageHbs;
  }
}
