import { Block } from "@Core";
import { Indexed } from "@app/types/Indexed";

import FormButtonHbs from "./FormButton.hbs";

interface IFormButtonProps extends Indexed {
  title: string;
  transparent: boolean;
  onClick: () => void;
}

export class FormButton extends Block<IFormButtonProps> {
  constructor(props: IFormButtonProps) {
    super(props);
    this.props.events = {
      click: this.props.onClick,
    };
  }

  componentDidMount(): void {
    console.log("formButton CDM");
  }

  componentWillUnmount(): void {
    console.log("formButton CWU");
  }

  protected render() {
    return FormButtonHbs;
  }
}
