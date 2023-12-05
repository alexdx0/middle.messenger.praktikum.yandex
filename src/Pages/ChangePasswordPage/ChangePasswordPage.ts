import { Block } from "@Core";
import { validateFns } from "@utils/validateFns";
import { FormInput } from "@components/FormInput";
import { Router } from "@app/appRouting";
import { connect } from "@Core/connect";
import { Indexed } from "@app/types/Indexed";
import { UserModel } from "@models/UserModel";
import { UserController } from "@app/Controllers/UserController";
import { getFormRefsData } from "@utils/getFormRefsData";
import { PasswordChangeModel } from "@models/PasswordChangeModel";
import { apiErrorHandler } from "@utils/apiErrorHandler";

import ChangePasswordPageHbs from "./ChangePasswordPage.hbs";

interface IChangePasswordPageProps extends Indexed {
  user: UserModel;
}

class ChangePasswordPage extends Block<IChangePasswordPageProps> {
  constructor(props: IChangePasswordPageProps) {
    super({
      ...props,
      validateFns,
      confirmValidateFn: (password: string) => {
        const newPassword = (this.refs.newPassword as FormInput).value();
        return password === newPassword ? "" : "Введенные пароли не совпадают";
      },
      saveHandler: () => {
        const formData = getFormRefsData(this.refs as Record<keyof UserModel, FormInput>);
        UserController.changeUserPassword(formData as unknown as PasswordChangeModel)
          .catch(apiErrorHandler);
      },
      backHandler: () => Router.go("/messenger"),
    });
  }

  protected render() {
    return ChangePasswordPageHbs;
  }
}

const instance = connect(({ user }) => ({ user }))(ChangePasswordPage);
export { instance as ChangePasswordPage };
