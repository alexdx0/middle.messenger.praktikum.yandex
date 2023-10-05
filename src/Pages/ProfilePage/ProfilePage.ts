import { Block } from "@Core";
import { validateFns } from "@utils/validateFns";
import { formDataLogger } from "@utils/formDataLogger";
import { FormInput } from "@components/FormInput";

import ProfilePageHbs from "./ProfilePage.hbs";

interface IProfilePageProps {
  [key: string]: unknown;
  edit: boolean;
}

export class ProfilePage extends Block<IProfilePageProps> {
  constructor(props: IProfilePageProps) {
    super({
      ...props,
      validateFns,
      onSave: (e: MouseEvent) => formDataLogger(this.refs as Record<string, FormInput>, e),
    });
  }

  protected render() {
    return ProfilePageHbs;
  }
}
