import { Block } from "@Core";
import { Indexed } from "@app/types/Indexed";

import ModalCloseButtonHbs from "./ModalCloseButton.hbs";

interface IModalCloseButtonProps extends Indexed {
  onClick: () => void;
}

export class ModalCloseButton extends Block<IModalCloseButtonProps> {
  constructor(props: IModalCloseButtonProps) {
    super(props);
    this.props.events = {
      click: this.props.onClick,
    };
  }

  protected render() {
    return ModalCloseButtonHbs;
  }
}
