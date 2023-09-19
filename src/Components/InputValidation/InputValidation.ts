import { Block } from "@Core";

import InputValidationHbs from "./InputValidation.hbs";

export class InputValidation extends Block {
  protected render() {
    return InputValidationHbs;
  }
}
