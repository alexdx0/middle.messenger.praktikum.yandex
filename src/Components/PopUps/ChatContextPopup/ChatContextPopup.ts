import { Block } from "@Core";
import { AppStore } from "@Core/AppStore";
import { connect } from "@Core/connect";
import { Indexed } from "@app/types/Indexed";
import { ModalService } from "@app/Modals/ModalService";
import { ChatsController } from "@app/Controllers/ChatsController";
import { ChatModel } from "@models/ChatModel";

import ChatContextPopupHbs from "./ChatContextPopup.hbs";

interface IChatContextPopupProps extends Indexed {
  isChatContextPopupOpened: boolean;
  overlayClickHandler: () => void;
  currentChat: ChatModel
}

class ChatContextPopup extends Block<IChatContextPopupProps> {
  constructor(props: IChatContextPopupProps) {
    super({
      ...props,
      overlayClickHandler: () => {
        AppStore.set({ isChatContextPopupOpened: false });
      },
      addUserHandler: () => {
        AppStore.set({ isChatContextPopupOpened: false });
        ModalService.show("add-user-modal", null);
      },
      removeUserHandler: () => {
        AppStore.set({ isChatContextPopupOpened: false });
        ModalService.show("remove-user-modal", null);
      },
      changeAvatarHandler: () => {
        ModalService.show("info-modal", { message: "Функционал в разработке" });
      },
      addChatHandler: () => {
        ModalService.show("add-chat-modal", null);
      },
      removeChatHandler: () => {
        ChatsController.deleteChat(props.currentChat.id)
          .then(() => {
            AppStore.set({ isChatContextPopupOpened: false, currentChat: undefined });
            ChatsController.getChats();
          });
      },
    });
  }

  protected render() {
    return ChatContextPopupHbs;
  }
}

const instance = connect(({ isChatContextPopupOpened, currentChat }) =>
  ({ isChatContextPopupOpened, currentChat }))(ChatContextPopup);
export { instance as ChatContextPopup };
