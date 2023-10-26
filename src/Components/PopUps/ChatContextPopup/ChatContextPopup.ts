import { Block } from "@Core";
import { AppStore } from "@Core/AppStore";
import { connect } from "@Core/connect";
import { Indexed } from "@app/types/Indexed";

import ChatContextPopupHbs from "./ChatContextPopup.hbs";

interface IChatContextPopupProps extends Indexed {
  isChatContextPopupOpened: boolean;
  overlayClickHandler: () => void;
}

class ChatContextPopup extends Block<IChatContextPopupProps> {
  constructor(props: IChatContextPopupProps) {
    super({
      ...props,
      overlayClickHandler: () => {
        AppStore.set({ isChatContextPopupOpened: false });
      },
    });
  }

  protected render() {
    return ChatContextPopupHbs;
  }
}

const instance = connect(({ isChatContextPopupOpened }) => ({ isChatContextPopupOpened }))(ChatContextPopup);
export { instance as ChatContextPopup };
