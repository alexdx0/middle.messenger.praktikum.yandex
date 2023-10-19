import { Block } from "@Core";
import { Indexed } from "@app/types/Indexed";

import ProfileFieldHbs from "./ProfileField.hbs";

interface IProfileFieldProps extends Indexed {
  validateFn: (value: string) => boolean;
}
export class ProfileField extends Block<IProfileFieldProps> {
  constructor(props: IProfileFieldProps) {
    super({
      ...props,
      onBlur: () => this.validate(),
    });
  }

  private get inputValue() {
    return ((this.refs.input as ProfileField)?._element as HTMLInputElement)?.value;
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
    return ProfileFieldHbs;
  }
}
