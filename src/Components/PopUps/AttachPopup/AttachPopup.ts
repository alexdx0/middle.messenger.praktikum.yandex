import { Block } from "@Core";
import { connect } from "@Core/connect";
import { Indexed } from "@app/types/Indexed";
import { AppStore } from "@Core/AppStore";
import { ModalService } from "@app/Modals/ModalService";

import AttachPopupHbs from "./AttachPopup.hbs";

interface IAttachPopupProps extends Indexed{
  isAttachPopupOpened: boolean;
  overlayClickHandler: () => void;
}

class AttachPopup extends Block<IAttachPopupProps> {
  constructor(props: IAttachPopupProps) {
    super({
      ...props,
      overlayClickHandler: () => {
        AppStore.set({ isAttachPopupOpened: false });
      },
      addPhotoHandler: () => {
        ModalService.show("info-modal", { message: "Функционал в разработке" });
      },
      addFileHandler: () => {
        ModalService.show("info-modal", { message: "Функционал в разработке" });
      },
      addLocationHandler: () => {
        ModalService.show("info-modal", { message: "Функционал в разработке" });
      },
    });
  }

  protected render() {
    return AttachPopupHbs;
  }
}

const instance = connect(({ isAttachPopupOpened }) => ({ isAttachPopupOpened }))(AttachPopup);
export { instance as AttachPopup };
