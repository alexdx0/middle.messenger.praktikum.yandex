import { Block } from "@Core";
// import { Router } from "@app/appRouting";
// import { ChatContextPopup } from "@components/index";
import { UseClickOutside } from "@utils/UseClickOutside";
import { BlockPropsType } from "@Core/Block";

import MessagesListHbs from "./MessagesList.hbs";

export class MessagesList extends Block {
  private _isContextPopupVisible: boolean = false;
  private _isAttachPopupVisible: boolean = false;
  private _clickOutsideDisposers: Array<() => void> = [];

  constructor() {
    super({
      onMenuClick: (e: MouseEvent) => {
        e.stopPropagation();
        // Router.go("/error", { code: "500", description: "Мы уже фиксим" });
        if (this._isContextPopupVisible) {
          this.refs.contextPopup.hide();
        } else {
          this.refs.contextPopup.show();
        }
        this._isContextPopupVisible = !this._isContextPopupVisible;
      },
      onAttachClick: (e: MouseEvent) => {
        e.stopPropagation();
        // Router.go("/error", { code: "500", description: "Мы уже фиксим" });
        if (this._isAttachPopupVisible) {
          this.refs.attachPopup.hide();
        } else {
          this.refs.attachPopup.show();
        }
        this._isAttachPopupVisible = !this._isAttachPopupVisible;
      },

    });

    this.refs.contextPopup.hide();
    this.refs.attachPopup.hide();

    // this.props.messages = [chats[1].last_message];
    // this.props.title = chats[1].title;
  }

  closeContextPopup = () => {
    // console.log("click outside");
    this.refs.contextPopup.hide();
    this._isContextPopupVisible = false;
  };

  closeAttachPopup = () => {
    // console.log("click outside");
    this.refs.attachPopup.hide();
    this._isAttachPopupVisible = false;
  };

  componentDidMount = () => {
    console.log("MessagesList CDM");
    this._clickOutsideDisposers.push(UseClickOutside(this.refs.contextPopup.element, this.closeContextPopup));
    this._clickOutsideDisposers.push(UseClickOutside(this.refs.attachPopup.element, this.closeAttachPopup));

    setTimeout(() => {
      console.log("disposers", this._clickOutsideDisposers);
    }, 5000);
  };

  componentDidUpdate(oldProps: BlockPropsType, newProps: BlockPropsType): void {
    console.log("MessagesList CDU");
    console.log(this);
  }

  componentWillUnmount() {
    console.log("MessagesList CWU");
    this._clickOutsideDisposers.forEach(disposer => {
      console.log("dispose");
      console.log(disposer);
      disposer();
    });
  }

  protected render() {
    return MessagesListHbs;
  }
}
