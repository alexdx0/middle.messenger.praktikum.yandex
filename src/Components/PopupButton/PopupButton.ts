import { Block } from "@Core";
import { Indexed } from "@app/types/Indexed";

import PopupButtonHbs from "./PopupButton.hbs";

interface IPopupButtonProps extends Indexed {
  onClick: () => void;
  title: string;
  icon: string;
}

export class PopupButton extends Block<IPopupButtonProps> {
  constructor(props: IPopupButtonProps) {
    super(props);
    this.props.events = {
      click: this.props.onClick,
    };
  }

  protected render() {
    return PopupButtonHbs;
  }
}
