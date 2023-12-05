import { Block } from "@Core";
import { ModalService } from "@app/Modals/ModalService";

import InfoModalHbs from "./InfoModal.hbs";

export class InfoModal extends Block {
  constructor() {
    super({
      okHandler: () => {
        ModalService.close("info-modal");
      },
      message: ModalService.getParams("info-modal")?.message,
    });
  }

  protected render() {
    return InfoModalHbs;
  }
}
