import { Block } from "@Core";
import { validateFns } from "@utils/validateFns";
import { FormInput } from "@components/FormInput";
import { getRefsInputsValues } from "@utils/getRefsInputsValues";
import { userSignUpModel } from "@models/userSignUpModel";
import { AuthController } from "@app/Controllers/AuthController";
import { Router } from "@app/appRouting";

import SignUpPageHbs from "./SignUpPage.hbs";

export class SignUpPage extends Block {
  constructor() {
    super({
      validateFns,
      signUpHandler: () => {
        // e.preventDefault();
        // e.stopPropagation();
        // formDataLogger(this.refs as Record<string, FormInput>, e);
        // formDataLogger(this.refs as Record<string, FormInput>, e);
        const formValues = getRefsInputsValues(this.refs as Record<keyof userSignUpModel, FormInput>);
        // console.log(formValues);
        if (Object.values(formValues).some(x => !x)) {
          return null;
        }
        AuthController.signUp(formValues);
        // Router.go("/messenger");
      },
      lognHandler() {
        Router.go("/");
      },
    });
  }

  componentDidMount(): void {
    console.log("SignUpPage CDM");
  }

  componentWillUnmount(): void {
    console.log("SignUpPage CWU");
  }

  protected render() {
    return SignUpPageHbs;
  }
}
