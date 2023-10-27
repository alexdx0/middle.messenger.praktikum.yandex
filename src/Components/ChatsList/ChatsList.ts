import { Block } from "@Core";
import { ChatModel } from "@models/ChatModel";
import { AppStore } from "@Core/AppStore";
import { Indexed } from "@app/types/Indexed";
import { ChatsController } from "@app/Controllers/ChatsController";

import ChatsListHbs from "./ChatsList.hbs";

interface IChatsListProps extends Indexed {
  cahts: ChatModel;
  chatSelectHandler: (chat: ChatModel) => void;
}
export class ChatsList extends Block<IChatsListProps> {
  constructor(props: IChatsListProps) {
    super({
      ...props,
      chatSelectHandler: (chat: ChatModel) => {
        AppStore.set({ currentChat: chat });
        ChatsController.getChatToken(chat.id)
          .then(token => AppStore.set({ token: token.response.token }));
      },
    });
  }

  protected render() {
    return ChatsListHbs;
  }
}
