import { Block } from "@Core";
import { Router } from "@app/appRouting";

import ErrorPageHbs from "./ErrorPage.hbs";

interface IErrorPageProps {
  code: string;
  description: string;
}

export class ErrorPage extends Block {
  constructor(props: IErrorPageProps) {
    super({
      ...props,
      back: () => Router.go("/messenger"),
    });
  }

  protected render() {
    return ErrorPageHbs;
  }
}
