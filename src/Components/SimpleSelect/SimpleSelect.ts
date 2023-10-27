import { Block } from "@Core";

import SimpleSelectHBS from "./SimpleSelect.hbs";

export type SelectOption = {title: string; value: number};

interface ISimpleSelectProps {
    options: SelectOption[];
}

export class SimpleSelect extends Block {
  constructor(props: ISimpleSelectProps) {
    super({
      ...props,
    });
  }

  protected render() {
    return SimpleSelectHBS;
  }
}
