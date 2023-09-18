import { Block } from "@Core";
import chats from "@services/stubs/ContactsListStub";

import ContactsListHbs from "./ChatsList.hbs";

export class ChatsList extends Block {
  constructor() {
    super();
    this.props.chats = chats;
  }

  protected render() {
    return ContactsListHbs;
  }
}