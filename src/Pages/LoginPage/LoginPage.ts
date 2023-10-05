import { Block } from "@Core";
import { validateFns } from "@utils/validateFns";
import { FormInput } from "@components/FormInput";
import { formDataLogger } from "@utils/formDataLogger";

import LoginPageHbs from "./LoginPage.hbs";

export class LoginPage extends Block {
  constructor() {
    super({
      validateFns,
      onLogin: (e: MouseEvent) => formDataLogger(this.refs as Record<string, FormInput>, e),
    });
  }

  protected render() {
    return LoginPageHbs;
  }
}
