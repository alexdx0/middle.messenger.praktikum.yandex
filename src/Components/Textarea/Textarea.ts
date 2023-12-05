import { Block } from "@Core";

import TextareaHBS from "./Textarea.hbs";

interface ITextareaProps {
    onBlur: () => void;
}

export class Textarea extends Block {
  constructor(props: ITextareaProps) {
    super({
      ...props,
      events: {
        blur: props.onBlur,
      },
    });
  }

  protected render() {
    return TextareaHBS;
  }
}
