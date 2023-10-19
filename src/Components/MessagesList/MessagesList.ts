import { Block } from "@Core";
// import { Router } from "@app/appRouting";
// import { ChatContextPopup } from "@components/index";

import MessagesListHbs from "./MessagesList.hbs";

export class MessagesList extends Block {
  private _isContextPopupVisible: boolean = true;

  constructor() {
    super({
      onMenuClick: () => {
        // Router.go("/error", { code: "500", description: "Мы уже фиксим" });
        this._isContextPopupVisible = !this._isContextPopupVisible;
        if (this._isContextPopupVisible) {
          this.refs.contextPopup.remove();
        } else {
          this.refs.contextPopup.show();
        }
        // this.props.isContextPopupVisible = this._isContextPopupVisible;
        // this.setProps({ isContextPopupVisible: this._isContextPopupVisible });
      },
    });
    this.refs.contextPopup.hide();
    // this.props.messages = [chats[1].last_message];
    // this.props.title = chats[1].title;
  }

  protected render() {
    return MessagesListHbs;
  }
}
