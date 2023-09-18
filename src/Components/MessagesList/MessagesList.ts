import { Block } from "@Core";
import contacts from "@services/stubs/ContactsListStub";

import MessagesListHbs from "./MessagesList.hbs";

interface IMessagesListProps {
  messages: [];
}

export class MessagesList extends Block {
  constructor(props: IMessagesListProps) {
    super(props);
    this.props.messages = contacts[1].messages;
  }

  protected render() {
    // console.log(" MessagesList props", this.props);
    return MessagesListHbs;
  }
}
