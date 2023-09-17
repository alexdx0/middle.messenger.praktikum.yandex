import { Block } from "@Core";

import MainLayoutHbs from "./MainLayout.hbs";

export class MainLayout extends Block {
  protected render() {
    console.log(" MainLayout props", this.props);
    return MainLayoutHbs;
  }
}
