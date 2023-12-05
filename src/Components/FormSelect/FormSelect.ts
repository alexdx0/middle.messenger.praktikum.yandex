import { Block } from "@Core";
import { Indexed } from "@app/types/Indexed";
import { SelectOption } from "@components/SimpleSelect/SimpleSelect";

import FormSelectHbs from "./FormSelect.hbs";

interface IFormSelectProps extends Indexed {
  options: SelectOption[];
}

export class FormSelect extends Block<IFormSelectProps> {
  constructor(props: IFormSelectProps) {
    super({
      ...props,
    });
  }

  private get selectValue() {
    return ((this.refs.select as FormSelect)?._element as HTMLInputElement)?.value;
  }

  public value() {
    return this.selectValue;
  }

  protected render() {
    return FormSelectHbs;
  }
}
