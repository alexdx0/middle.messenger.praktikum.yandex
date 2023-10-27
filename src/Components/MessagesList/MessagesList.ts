import { Block } from "@Core";
import { AppStore } from "@Core/AppStore";
import { connect } from "@Core/connect";
import { Indexed } from "@app/types/Indexed";
import { MouseEventHandler } from "@models/MouseEventHandler";
import WebSocketTransport from "@Core/WebSocketTransport";
import { ChatModel } from "@models/ChatModel";
import { MessageModel } from "@models/MessageModel";
import { ChatsController } from "@app/Controllers/ChatsController";

import MessagesListHbs from "./MessagesList.hbs";

interface IMessagesListProps extends Indexed {
  onMenuClick: MouseEventHandler;
  isChatContextPopupOpened: boolean;

  chat: ChatModel;
  userId: number;
  token: string;
  messages: MessageModel;
}

class MessagesList extends Block<IMessagesListProps> {
  constructor(props: IMessagesListProps) {
    // console.log("MessagesList props", props);
    super({
      ...props,
      menuClickHandler: () => {
        AppStore.set({ isChatContextPopupOpened: true });
        // Router.go("/error", { code: "500", description: "Мы уже фиксим" });
      },
      attachClickHandler: () => {
        // Router.go("/error", { code: "500", description: "Мы уже фиксим" });
        AppStore.set({ isAttachPopupOpened: true });
      },

    });

    if (props.chat) {
      ChatsController.getChatToken(props.chat.id)
        .then(token => AppStore.set({ token: token.response.token }));
    }

    // this.refs.contextPopup.hide();
    // this.refs.attachPopup.hide();

    // this.props.messages = [chats[1].last_message];
    // this.props.title = chats[1].title;
  }

  componentDidMount(): void {
    const updater = (messages: MessageModel[]) => {
      AppStore.set({ messages });
    };
    // eslint-disable-next-line no-new
    new WebSocketTransport(this.props.userId, this.props.chat.id, this.props.token, updater);
  }

  componentDidUpdate(_oldProps: IMessagesListProps, _newProps: IMessagesListProps): void {
    const updater = (messages: MessageModel[]) => {
      AppStore.set({ messages });
    };
    // eslint-disable-next-line no-new
    new WebSocketTransport(this.props.userId, this.props.chat.id, this.props.token, updater);
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
