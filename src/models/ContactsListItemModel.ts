import { MessageModel } from "@models/MessageModel";

export interface ContactsListItemModel {
  name: string;
  time: string;
  messages: MessageModel[];
  messagesCount: number;
}
