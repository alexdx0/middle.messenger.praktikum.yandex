import { Block } from "@Core";
import { Indexed } from "@app/types/Indexed";
import { UserController } from "@app/Controllers/UserController";

import AvatarInputHbs from "./AvatarInput.hbs";

// import { ApiHost } from "../../constants/commonConstants";
// import { changeAvatar } from "../../services/UsersService";

interface IAvatarInputProps extends Indexed {
 avatarId: string;
}

export class AvatarInput extends Block<IAvatarInputProps> {
  constructor(props: IAvatarInputProps) {
    console.log("AvatarInput props", props);
    super({
      ...props,
      avatarUri: `https://ya-praktikum.tech/api/v2/resources${props.avatarId}`,
    });
    this.props.events = {
      click: () => {
        const avaFile = document.getElementById("file");
        if (avaFile) {
          avaFile.click();
          avaFile.onchange = (e: Event) => {
            const filesList = (e.target as HTMLInputElement)?.files ?? [];
            UserController.setAvatar(filesList[0]);
          };
        }
      },
    };
  }

  componentDidUpdate(_oldProps: IAvatarInputProps, _newProps: IAvatarInputProps): void {
    console.log("AvatarInput CDU old", _oldProps);
    console.log("AvatarInput CDU new", _newProps);
  }

  protected render() {
    return AvatarInputHbs;
  }
}
