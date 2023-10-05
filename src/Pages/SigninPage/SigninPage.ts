import { Block } from "@Core";
import { validateFns } from "@utils/validateFns";
import { FormInput } from "@components/FormInput";
import { formDataLogger } from "@utils/formDataLogger";

import SigninPageHbs from "./SigninPage.hbs";

export class SigninPage extends Block {
  constructor() {
    super({
      validateFns,
      onSignin: (e: MouseEvent) => formDataLogger(this.refs as Record<string, FormInput>, e),
    });
  }

  protected render() {
    return SigninPageHbs;
  }
}
