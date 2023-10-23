import { Block } from "@Core";
import { Indexed } from "@app/types/Indexed";
import { Router } from "@app/appRouting";

import LinkHbs from "./Link.hbs";

interface ILinkProps extends Indexed {
  to: string;
}
export class Link extends Block<ILinkProps> {
  constructor(props: ILinkProps) {
    super(props);
    this.props.events = {
      click: (e: MouseEvent) => {
        e.stopPropagation();
        Router.go(this.props.to);
      },
    };
  }

  protected render() {
    return LinkHbs;
  }
}
