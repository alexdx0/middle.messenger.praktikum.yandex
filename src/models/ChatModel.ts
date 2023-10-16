import { MessageModel } from "@models/MessageModel";

/**
 * Модель чата
 */
export interface ChatModel {
  id: number;
  title: string;
  avatar: string;
  created_by: number;
  unread_count: number;
  last_message: MessageModel;
}
