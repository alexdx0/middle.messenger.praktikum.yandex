import { Block } from "@Core";

import SimpleInputHBS from "./SimpleInput.hbs";

interface ISimpleInputProps {
    onBlur: () => void;
}

export class SimpleInput extends Block {
  constructor(props: ISimpleInputProps) {
    super({
      ...props,
      events: {
        blur: props.onBlur,
      },
    });
  }

  protected render() {
    return SimpleInputHBS;
  }
}
