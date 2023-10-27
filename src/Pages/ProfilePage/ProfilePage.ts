import { Block } from "@Core";
import { validateFns } from "@utils/validateFns";
import { FormInput } from "@components/FormInput";
import { Router } from "@app/appRouting";
import { connect } from "@Core/connect";
import { Indexed } from "@app/types/Indexed";
import { UserModel } from "@models/UserModel";
import { UserController } from "@app/Controllers/UserController";
import { getFormRefsData } from "@utils/getFormRefsData";
import { AuthController } from "@app/Controllers/AuthController";

import ProfilePageHbs from "./ProfilePage.hbs";

interface IProfilePageProps extends Indexed {
  edit: boolean;
  user: UserModel;
}

class ProfilePage extends Block<IProfilePageProps> {
  constructor(props: IProfilePageProps) {
    super({
      ...props,
      validateFns,
      saveHandler: () => {
        const formData = getFormRefsData(this.refs as Record<keyof UserModel, FormInput>);
        UserController.changeUserProfile(formData as unknown as UserModel);
      },
      logoutHandler: () => {
        AuthController.logout();
      },
      changePasswordHandler: () => {
        Router.go("/change-password");
      },
      backHandler: () => Router.go("/messenger"),
      editProfileHandler: () => Router.go("/settings", { edit: true }),
    });
  }

  protected render() {
    return ProfilePageHbs;
  }
}

const instance = connect(({ user }) => ({ user }))(ProfilePage);
export { instance as ProfilePage };
