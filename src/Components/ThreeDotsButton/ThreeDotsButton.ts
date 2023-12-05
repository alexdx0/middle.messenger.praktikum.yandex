import { Block } from "@Core";
import { Indexed } from "@app/types/Indexed";

import ThreeDotsButtonHbs from "./ThreeDotsButton.hbs";

interface IThreeDotsButtonProps extends Indexed {
  onClick: () => void;
}

export class ThreeDotsButton extends Block<IThreeDotsButtonProps> {
  constructor(props: IThreeDotsButtonProps) {
    super(props);
    this.props.events = {
      click: this.props.onClick,
    };
  }

  protected render() {
    return ThreeDotsButtonHbs;
  }
}
