import { Block } from "@Core";
import { Indexed } from "@app/types/Indexed";
import { AuthService } from "@services/AuthService";

import MainLayoutHbs from "./MainLayout.hbs";

interface IMainLayoutProps extends Indexed {
  test: () => void;
}
export class MainLayout extends Block<IMainLayoutProps> {
  constructor(props: IMainLayoutProps) {
    super({
      ...props,
      test: () => {
        AuthService.getUserInfo().then((data) => console.log(JSON.parse((data as XMLHttpRequest).response)));
      },
    });
  }

  protected render() {
    return MainLayoutHbs;
  }
}
