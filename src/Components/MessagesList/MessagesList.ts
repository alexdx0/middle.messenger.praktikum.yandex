import { Block } from "@Core";
import { AppStore } from "@Core/AppStore";
import { connect } from "@Core/connect";
import { Indexed } from "@app/types/Indexed";
import { MouseEventHandler } from "@models/MouseEventHandler";

import MessagesListHbs from "./MessagesList.hbs";

interface IMessagesListProps extends Indexed {
  onMenuClick: MouseEventHandler;
  isChatContextPopupOpened: boolean;
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

    // this.refs.contextPopup.hide();
    // this.refs.attachPopup.hide();

    // this.props.messages = [chats[1].last_message];
    // this.props.title = chats[1].title;
  }

  protected render() {
    return MessagesListHbs;
  }
}

const instance = connect((state) => ({
  isChatContextPopupOpened: state.isChatContextPopupOpened,
  chat: state.currentChat,
}))(MessagesList);
export { instance as MessagesList };
