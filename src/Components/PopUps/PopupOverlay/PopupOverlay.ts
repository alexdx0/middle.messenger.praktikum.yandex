import { Block } from "@Core";
import { Indexed } from "@app/types/Indexed";
import { MouseEventHandler } from "@models/MouseEventHandler";

import PopupOverlayHbs from "./PopupOverlay.hbs";

interface UnderlayProps extends Indexed {
    onClick: MouseEventHandler;
}

export class PopupOverlay extends Block<UnderlayProps> {
  constructor(props: UnderlayProps) {
    super(props);
    this.props.events = {
      click: this.props.onClick,
    };
  }

  protected render() {
    return PopupOverlayHbs;
  }
}
