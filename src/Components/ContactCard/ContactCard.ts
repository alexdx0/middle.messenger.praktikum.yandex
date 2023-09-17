import { Block } from "@Core";
import contacts from "@services/stubs/ContactsListStub";
import { ContactsListItemModel } from "@models/ContactsListItemModel";

import ContactCardHbs from "./ContactCard.hbs";

interface IContactCardProps {
  contact: ContactsListItemModel;
}

export class ContactCard extends Block {
  constructor(props: IContactCardProps) {
    super(props);
    this.props.messages = contacts[1].messages;
  }

  protected render() {
    return ContactCardHbs;
  }
}
