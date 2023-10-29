import { Block } from "@Core";
import { Indexed } from "@app/types/Indexed";
import { connect } from "@Core/connect";
import { ChatsController } from "@app/Controllers/ChatsController";
import { AuthController } from "@app/Controllers/AuthController";
import { ModalService } from "@app/Modals/ModalService";

import MainLayoutHbs from "./MainLayout.hbs";

interface IMainLayoutProps extends Indexed {
  test: () => void;
}
class MainLayout extends Block<IMainLayoutProps> {
  constructor(props: IMainLayoutProps) {
    super({
      ...props,
      addChatHandler: () => {
        ModalService.show("add-chat-modal", null);
      },
    });
  }

  componentDidMount(): void {
    ChatsController.getChats();
    AuthController.getUserInfo();
  }

  protected render() {
    return MainLayoutHbs;
  }
}

const instance = connect(({ chats }) => ({ chats }))(MainLayout);
export { instance as MainLayout };
