import { Block } from "@Core";

import FormInputHbs from "./FormInput.hbs";

interface IFormInputProps {
  value: () => string;
  validate: () => boolean;
  onBlur: () => void;
}

export class FormInput extends Block {
  constructor(props: IFormInputProps) {
    super({
      ...props,
      onBlur: () => this.log(),
    });
  }

  private log() {
    const value = (this.element as HTMLInputElement)?.value;
    console.log("!!!", value);
  }

  protected render() {
    return FormInputHbs;
  }
}
