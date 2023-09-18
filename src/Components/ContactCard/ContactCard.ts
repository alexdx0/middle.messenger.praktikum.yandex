import { Block } from "@Core";
import contacts from "@services/stubs/ContactsListStub";
import { ContactsListItemModel } from "@models/ContactsListItemModel";

import ContactCardHbs from "./ContactCard.hbs";

interface IContactCardProps {
  contact: ContactsListItemModel;
}

export class ContactCard extends Block {
  protected render() {
    console.log("ContactCard props", this.props);
    return ContactCardHbs;
  }
}
