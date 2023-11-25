import { Block } from "@Core";
import { validateFns } from "@utils/validateFns";
import { FormInput } from "@components/FormInput";
import { getRefsInputsValues } from "@utils/getRefsInputsValues";
import { userSignUpModel } from "@models/userSignUpModel";
import { AuthController } from "@app/Controllers/AuthController";
import { Router } from "@app/appRouting";
import { apiErrorHandler } from "@utils/apiErrorHandler";

import SignUpPageHbs from "./SignUpPage.hbs";

export class SignUpPage extends Block {
  constructor() {
    super({
      validateFns,
      signUpHandler: () => {
        const formValues = getRefsInputsValues(this.refs as Record<keyof userSignUpModel, FormInput>);
        if (Object.values(formValues).some(x => !x)) {
          return null;
        }
        AuthController.signUp(formValues)
          .catch(apiErrorHandler);
      },
      lognHandler() {
        Router.go("/");
      },
    });
  }

  protected render() {
    return SignUpPageHbs;
  }
}
