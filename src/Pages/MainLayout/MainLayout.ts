import { Block } from "@Core";
import { Indexed } from "@app/types/Indexed";
import { connect } from "@Core/connect";
import { ChatsController } from "@app/Controllers/ChatsController";
import { AuthController } from "@app/Controllers/AuthController";
import { ModalService } from "@app/Modals/ModalService";
import { apiErrorHandler } from "@utils/apiErrorHandler";

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
    ChatsController.getChats().catch(apiErrorHandler);
    AuthController.getUserInfo().catch(apiErrorHandler);
  }

  protected render() {
    return MainLayoutHbs;
  }
}

const instance = connect(({ chats }) => ({ chats }))(MainLayout);
export { instance as MainLayout };
