import { Block } from "@Core";
import { Indexed } from "@app/types/Indexed";
import { connect } from "@Core/connect";
import { ChatsController } from "@app/Controllers/ChatsController";

import MainLayoutHbs from "./MainLayout.hbs";

interface IMainLayoutProps extends Indexed {
  test: () => void;
}
class MainLayout extends Block<IMainLayoutProps> {
  constructor(props: IMainLayoutProps) {
    super({
      ...props,
      // test: () => {
      //   AuthService.getUserInfo().then((data) => console.log(JSON.parse((data as XMLHttpRequest).response)));
      // },
    });
  }

  componentDidMount(): void {
    ChatsController.getChats();
  }

  protected render() {
    return MainLayoutHbs;
  }
}

const instance = connect(({ chats }) => ({ chats }))(MainLayout);
export { instance as MainLayout };
