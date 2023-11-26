import { Block } from "@Core";
import { AppStore } from "@Core/AppStore";
import { connect } from "@Core/connect";
import { Indexed } from "@app/types/Indexed";
import { MouseEventHandler } from "@models/MouseEventHandler";
import { ChatModel } from "@models/ChatModel";
import { ChatsController } from "@app/Controllers/ChatsController";
import { WebSocketTransport } from "@Core/WebSocketTransport";
import { MessageInput } from "@components/MessageInput";
import { CardMessageModel } from "@models/CardMessageModel";
import { apiErrorHandler } from "@utils/apiErrorHandler";

import MessagesListHbs from "./MessagesList.hbs";

interface IMessagesListProps extends Indexed {
  onMenuClick: MouseEventHandler;
  isChatContextPopupOpened: boolean;

  chat: ChatModel;
  userId: number;
  token: string;
  messages: CardMessageModel[];
}

class MessagesList extends Block<IMessagesListProps> {
  constructor(props: IMessagesListProps) {
    super({
      ...props,
      menuClickHandler: () => {
        AppStore.set({ isChatContextPopupOpened: true });
      },
      attachClickHandler: () => {
        AppStore.set({ isAttachPopupOpened: true });
      },
      sendHandler: () => {
        if ((this.refs.message as MessageInput).value()) {
          // Сообщение отправляется только тогда, когда оно введено
          WebSocketTransport.sendMessage((this.refs.message as MessageInput).value());
        }
      },
    });

    if (props.chat) {
      ChatsController.getChatToken(props.chat.id)
        .then(token => AppStore.set({ token: token.response.token }))
        .catch(apiErrorHandler);
    }
  }

  protected render() {
    return MessagesListHbs;
  }
}

const instance = connect((state) => ({
  isChatContextPopupOpened: state.isChatContextPopupOpened,
  chat: state.currentChat,
  userId: state.user?.id,
  token: state.token,
  messages: state.messages,
}))(MessagesList);
export { instance as MessagesList };
