import { Block } from "@Core";
import contacts from "@services/stubs/ContactsListStub";

import ContactsListHbs from "./ContactsList.hbs";

interface IContactsListProps {
  contacts: [];
}

export class ContactsList extends Block {
  constructor(props: IContactsListProps) {
    super(props);
    this.props.contacts = contacts;
  }

  protected render() {
    return ContactsListHbs;
  }
}
