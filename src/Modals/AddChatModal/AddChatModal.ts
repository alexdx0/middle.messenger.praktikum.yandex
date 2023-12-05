import { Block } from "@Core";
import { ModalService } from "@app/Modals/ModalService";
import { FormInput } from "@components/FormInput";
import { ChatsController } from "@app/Controllers/ChatsController";
import { connect } from "@Core/connect";
import { Indexed } from "@app/types/Indexed";
import { ChatModel } from "@models/ChatModel";
import { AppStore } from "@Core/AppStore";
import { apiErrorHandler } from "@utils/apiErrorHandler";

import AddChatModalHbs from "./AddChatModal.hbs";

interface IAddChatModalProps extends Indexed {
  currentChat: ChatModel;
}

class AddChatModal extends Block<IAddChatModalProps> {
  constructor(props: IAddChatModalProps) {
    super({
      ...props,
      addHandler: () => {
        ChatsController.addChat((this.refs.name as FormInput).value() as string)
          .then(() => ChatsController.getChats())
          .catch(apiErrorHandler);

        AppStore.set({ isChatContextPopupOpened: false });
        ModalService.close("add-chat-modal");
      },
      closeHandler: () => {
        ModalService.close("add-chat-modal");
      },
    });
  }

  protected render() {
    return AddChatModalHbs;
  }
}

const instance = connect(({ currentChat }) => ({ currentChat }))(AddChatModal);
export { instance as AddChatModal };
