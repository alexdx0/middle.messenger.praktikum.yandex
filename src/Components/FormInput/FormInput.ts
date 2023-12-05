import { Block } from "@Core";
import { Indexed } from "@app/types/Indexed";

import FormInputHbs from "./FormInput.hbs";

interface IFormInputProps extends Indexed {
  validateFn: (value: string) => boolean;
}

export class FormInput extends Block<IFormInputProps> {
  constructor(props: IFormInputProps) {
    super({
      ...props,
      onBlur: () => this.validate(),
    });
  }

  private get inputValue() {
    return ((this.refs.input as FormInput)?._element as HTMLInputElement)?.value;
  }

  private validate() {
    const value = this.inputValue;
    const error = this.props.validateFn?.(value);
    if (error) {
      (this.refs.inputValidation as Block).setProps({ validateStr: error });
      return false;
    }
    (this.refs.inputValidation as Block).setProps({ validateStr: "" });
    return true;
  }

  public value() {
    if (!this.validate()) {
      return false;
    }
    return this.inputValue;
  }

  protected render() {
    return FormInputHbs;
  }
}
