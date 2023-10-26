import { Block } from "@Core";
import { validateFns } from "@utils/validateFns";
import { formDataLogger } from "@utils/formDataLogger";
import { FormInput } from "@components/FormInput";
import { Router } from "@app/appRouting";
import { connect } from "@Core/connect";
import { Indexed } from "@app/types/Indexed";
import { UserModel } from "@models/UserModel";

import ProfilePageHbs from "./ProfilePage.hbs";

interface IProfilePageProps extends Indexed {
  edit: boolean;
  user: UserModel;
}

class ProfilePage extends Block<IProfilePageProps> {
  constructor(props: IProfilePageProps) {
    // console.log("ProfilePage props", props);
    super({
      ...props,
      validateFns,
      onSave: (e: MouseEvent) => {
        formDataLogger(this.refs as Record<string, FormInput>, e);
        Router.go("/messenger");
      },
      onBack: () => Router.go("/messenger"),
      onEditProfile: () => Router.go("/settings", { edit: true }),
      avatarId: props.user.avatar,
    });
  }

  componentDidUpdate(_oldProps: IProfilePageProps, _newProps: IProfilePageProps): void {
    console.log("ProfilePage CDU");
  }

  protected render() {
    return ProfilePageHbs;
  }
}

const instance = connect(({ user }) => ({ user }))(ProfilePage);
export { instance as ProfilePage };
