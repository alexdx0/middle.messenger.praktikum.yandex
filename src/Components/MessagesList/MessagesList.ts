import { Block } from "@Core";
import chats from "@services/stubs/ContactsListStub";
import { Router } from "@app/appRouting";

import MessagesListHbs from "./MessagesList.hbs";

export class MessagesList extends Block {
  constructor() {
    super({
      onMenuClick: () => Router.go("/error", { code: "500", description: "Мы уже фиксим" }),
    });
    this.props.messages = [chats[1].last_message];
    this.props.title = chats[1].title;
  }

  protected render() {
    return MessagesListHbs;
  }
}
