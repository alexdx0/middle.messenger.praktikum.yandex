import { Block } from "@Core";
import { Indexed } from "@app/types/Indexed";
import { ChatsService } from "@services/ChatsService";
import { AppStore } from "@app/AppStore";
import { connect } from "@Core/connect";

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
    ChatsService.getChats().then((data) => {
      AppStore.set({ chats: data.response });
    });
  }

  protected render() {
    return MainLayoutHbs;
  }
}

const instance = connect(({ chats }) => ({ chats }))(MainLayout);
export { instance as MainLayout };
