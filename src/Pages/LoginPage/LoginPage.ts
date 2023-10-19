import { Router } from "@app/appRouting";
import { Block } from "@Core";
import { validateFns } from "@utils/validateFns";
import { FormInput } from "@components/FormInput";
import { AuthController } from "@app/Controllers/AuthController";
import { getRefsInputsValues } from "@utils/getRefsInputsValues";
import { connect } from "@Core/connect";

import LoginPageHbs from "./LoginPage.hbs";

type LoginPageInputs = {
  login: string;
  password: string;
}

/** Страница входа в учетную запись */
class LoginPage extends Block {
  constructor() {
    super({
      validateFns,
      noAccountHandler: () => {
        // AuthController.logout();
        Router.go("/sign-up");
      },
      loginHandler: () => {
        // formDataLogger(this.refs as Record<string, FormInput>, e);
        const formValues = getRefsInputsValues(this.refs as Record<keyof LoginPageInputs, FormInput>);
        // console.log(formValues);
        if (Object.values(formValues).some(x => !x)) {
          return null;
        }
        AuthController.signIn(formValues.login, formValues.password)
          .then(() => Router.go("/messenger"));
        // AuthController.getUserInfo();
        // Router.go("/messenger");
      },
    });
  }

  componentDidMount(): void {
    console.log("loginPage CDM");
  }

  componentWillUnmount(): void {
    console.log("loginPage CWU");
  }

  protected render() {
    return LoginPageHbs;
  }
}

const instance = connect(({ chats, user }) => ({ chats, user }))(LoginPage);
export { instance as LoginPage };
