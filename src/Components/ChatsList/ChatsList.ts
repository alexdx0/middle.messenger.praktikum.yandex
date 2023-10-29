import { Block } from "@Core";
import { ChatModel } from "@models/ChatModel";
import { AppStore } from "@Core/AppStore";
import { Indexed } from "@app/types/Indexed";
import { ChatsController } from "@app/Controllers/ChatsController";
import { WebSocketTransport } from "@Core/WebSocketTransport";
import { MessageModel } from "@models/MessageModel";
import { connect } from "@Core/connect";
import { formatDateTime } from "@utils/dateTime";
import { UserModel } from "@models/UserModel";

import ChatsListHbs from "./ChatsList.hbs";

interface IChatsListProps extends Indexed {
  chats: ChatModel[];
  chatSelectHandler: (chat: ChatModel) => void;
  currentChat: ChatModel;
  user: UserModel;
}
class ChatsList extends Block<IChatsListProps> {
  constructor(props: IChatsListProps) {
    super({
      ...props,
      chatSelectHandler: (chat: ChatModel) => {
        if (chat.id !== this.props.currentChat?.id) {
          AppStore.set({ messages: [] });
          AppStore.set({ currentChat: chat });
          this.chatConnect(chat);
        }
      },
    });

    // Если обновили страницу и в сторе выставлен текущий чат - подключаем для него WS
    if (props.currentChat) {
      this.chatConnect(props.currentChat);
    }
  }

  /** Метод подключения WS для чата */
  chatConnect(chat: ChatModel) {
    ChatsController.getChatToken(chat.id)
      .then(token => {
        AppStore.set({ token: token.response.token });
        ChatsController.getChatUsers(chat.id)
          .then(({ response: users }) => {
            const updater = (messages: MessageModel[]) => {
              const newMessages = messages.map(message => ({
                userName: users.find(user => user.id === message.user_id)?.login as string,
                text: message.content,
                time: formatDateTime(message.time),
                isMine: message.user_id === this.props.user?.id,
              }));

              AppStore.set({ messages: [...newMessages, ...AppStore.getState().messages] });
            };
            WebSocketTransport.connect(this.props.user.id, chat.id, token.response.token, updater);
          });
      });
  }

  protected render() {
    return ChatsListHbs;
  }
}

const instance = connect(({ currentChat, user, chats }) => ({ currentChat, user, chats }))(ChatsList);
export { instance as ChatsList };
