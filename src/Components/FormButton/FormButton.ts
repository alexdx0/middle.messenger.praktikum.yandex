import { Block } from "@Core";

import FormButtonHbs from "./FormButton.hbs";

interface IFormButtonProps {
  [key: string]: unknown;
  title: string;
  transparent: boolean;
  linkTo: string;
  onClick: () => void;
}

export class FormButton extends Block<IFormButtonProps> {
  constructor(props: IFormButtonProps) {
    super(props);
    this.props.events = {
      click: this.props.onClick,
    };
  }

  protected render() {
    return FormButtonHbs;
  }
}
