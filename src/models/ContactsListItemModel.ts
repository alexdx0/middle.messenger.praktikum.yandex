import { MessageModel } from "@models/MessageModel_";

export interface ContactsListItemModel {
  name: string;
  time: string;
  messages: MessageModel[];
  messagesCount: number;
}
