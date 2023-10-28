import { Block } from "@Core";
import { Indexed } from "@app/types/Indexed";
import { ChatModel } from "@models/ChatModel";
import { formatDateTime } from "@utils/dateTime";

import ChatCardHbs from "./ChatCard.hbs";

interface IChatCardProps extends Indexed {
  chat: ChatModel;
  onSelect: (chat: ChatModel) => void;
}

export class ChatCard extends Block<IChatCardProps> {
  constructor(props: IChatCardProps) {
    super({
      ...props,
      lastMessageTime: formatDateTime(props.chat?.last_message?.time),
    });

    this.props.events = {
      click: () => this.props.onSelect(props.chat),
    };
  }

  protected render() {
    return ChatCardHbs;
  }
}
