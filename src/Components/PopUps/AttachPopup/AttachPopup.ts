import { Block } from "@Core";

import AttachPopupHbs from "./AttachPopup.hbs";

export class AttachPopup extends Block {
  protected render() {
    return AttachPopupHbs;
  }
}
