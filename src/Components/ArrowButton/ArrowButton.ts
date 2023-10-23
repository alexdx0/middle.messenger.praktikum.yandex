import { Block } from "@Core";
import { Indexed } from "@app/types/Indexed";

import ArrowButtonHbs from "./ArrowButton.hbs";

interface IArrowButtonProps extends Indexed {
  direction: "left" | "right";
  onClick: () => void;
}

export class ArrowButton extends Block<IArrowButtonProps> {
  constructor(props: IArrowButtonProps) {
    super(
      {
        ...props,
        direction: props.direction ?? "right",
      });
    this.props.events = {
      click: this.props.onClick,
    };

    setTimeout(() => {
      this.setProps({ direction: "left" });
    }, 2000);
  }

  componentDidMount(): void {
    console.log("ArrowButton CDM");
  }

  componentWillUnmount(): void {
    console.log("ArrowButton CWU");
  }

  componentDidUpdate(prevProps, nextProps): void {
    console.log("ArrowButton CDU");
    // console.log("prevProps", prevProps);
    // console.log("nextProps", nextProps);
  }

  protected render() {
    return ArrowButtonHbs;
  }
}
