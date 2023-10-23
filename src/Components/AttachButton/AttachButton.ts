import { Block } from "@Core";
import { Indexed } from "@app/types/Indexed";

import AttachButtonHbs from "./AttachButton.hbs";

interface IAttachButtonProps extends Indexed {
  onClick: () => void;
}

export class AttachButton extends Block<IAttachButtonProps> {
  constructor(props: IAttachButtonProps) {
    super(props);
    this.props.events = {
      click: this.props.onClick,
    };
  }

  componentDidMount(): void {
    // console.log("AttachButton CDM");
  }

  componentWillUnmount(): void {
    // console.log("AttachButton CWU");
  }

  protected render() {
    return AttachButtonHbs;
  }
}
