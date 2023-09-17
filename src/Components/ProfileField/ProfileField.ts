import { Block } from "@Core";

import ProfileFieldHbs from "./ProfileField.hbs";

export class ProfileField extends Block {
  protected render() {
    return ProfileFieldHbs;
  }
}
