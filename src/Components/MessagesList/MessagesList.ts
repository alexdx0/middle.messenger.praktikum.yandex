import { Block } from "@Core";
// import { Router } from "@app/appRouting";
// import { ChatContextPopup } from "@components/index";

import MessagesListHbs from "./MessagesList.hbs";

const UseClickOutside = (element: HTMLElement | null, onClickOutside: () => void) => {
  const handler = (e: MouseEvent) => {
    if (!element?.contains(e.target as HTMLElement) && !(e.target as HTMLElement).contains(element)) {
      onClickOutside();
    }
  };
  const disposer = () => document.removeEventListener("click", handler);
  document.addEventListener("click", handler);
  return disposer;
};

export class MessagesList extends Block {
  private _isContextPopupVisible: boolean = false;
  private _clickOutsideDisposer: (() => void) | null = null;

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
    });
    this.refs.contextPopup.hide();

    // this.props.messages = [chats[1].last_message];
    // this.props.title = chats[1].title;
  }

  componentDidMount(): void {
    this._clickOutsideDisposer = UseClickOutside(this.refs.contextPopup.element, () => {
      console.log("click outside");
      // this.refs.contextPopup.hide();
      this.refs.contextPopup.hide();
      this._isContextPopupVisible = false;
    });
  }

  componentWillUnmount(): void {
    this._clickOutsideDisposer!();
  }

  protected render() {
    return MessagesListHbs;
  }
}
