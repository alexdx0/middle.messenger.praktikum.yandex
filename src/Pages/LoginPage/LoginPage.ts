import { Router } from "@app/appRouting";
import { Block } from "@Core";
import { validateFns } from "@utils/validateFns";
import { FormInput } from "@components/FormInput";
import { AuthController } from "@app/Controllers/AuthController";
import { getRefsInputsValues } from "@utils/getRefsInputsValues";
import { connect } from "@Core/connect";
import { AppStore } from "@Core/AppStore";

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
        Router.go("/sign-up");
      },
      loginHandler: () => {
        const formValues = getRefsInputsValues(this.refs as Record<keyof LoginPageInputs, FormInput>);
        if (Object.values(formValues).some(x => !x)) {
          return null;
        }
        AuthController.signIn(formValues.login, formValues.password)
          .then(() => {
            AuthController.getUserInfo();
            Router.go("/messenger");
          });
      },
    });
  }

  componentDidMount(): void {
    AppStore.clear();
  }

  protected render() {
    return LoginPageHbs;
  }
}

const instance = connect(({ chats, user }) => ({ chats, user }))(LoginPage);
export { instance as LoginPage };
