import { Block } from "@Core";
import { Indexed } from "@app/types/Indexed";

import ArrowButtonHbs from "./ArrowButton.hbs";

interface IArrowButtonProps extends Indexed {
  direction: "left" | "right";
  onClick: () => void;
}

export class ArrowButton extends Block<IArrowButtonProps> {
  constructor(props: IArrowButtonProps) {
    super(props);
    this.props.events = {
      click: this.props.onClick,
    };
  }

  protected render() {
    return ArrowButtonHbs;
  }
}
