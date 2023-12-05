import { Block } from "@Core";
import { AppStore } from "@Core/AppStore";
import { connect } from "@Core/connect";
import { Indexed } from "@app/types/Indexed";
import { ModalService } from "@app/Modals/ModalService";
import { ChatsController } from "@app/Controllers/ChatsController";
import { ChatModel } from "@models/ChatModel";
import { apiErrorHandler } from "@utils/apiErrorHandler";

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
        const avatarInput = document.getElementById("avatar-input");
        if (avatarInput) {
          avatarInput.click();
          avatarInput.onchange = (e: Event) => {
            const filesList = (e.target as HTMLInputElement)?.files ?? [];
            const chatId = AppStore.getState().currentChat!.id;
            ChatsController.setAvatar(chatId, filesList[0])
              .then((data) => {
                const store = AppStore.getState();
                const storeChats = store.chats;
                const chatIndex = storeChats.findIndex(chat => chat.id === chatId);
                storeChats.splice(chatIndex, 1, {
                  ...storeChats[chatIndex],
                  avatar: data.response.avatar,
                });
                // Изменение аватара текущего чата и в списке чатов
                AppStore.set({
                  chats: storeChats,
                  currentChat: { ...store.currentChat, avatar: data.response.avatar } as ChatModel,
                });
              })
              .catch(apiErrorHandler)
              .finally(() => AppStore.set({ isChatContextPopupOpened: false }));
          };
        }
      },
      addChatHandler: () => {
        ModalService.show("add-chat-modal", null);
      },
      removeChatHandler: () => {
        ChatsController.deleteChat(props.currentChat.id)
          .then(() => {
            AppStore.set({ isChatContextPopupOpened: false, currentChat: undefined });
            ChatsController.getChats();
          })
          .catch(apiErrorHandler);
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
