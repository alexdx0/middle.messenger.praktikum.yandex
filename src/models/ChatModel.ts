import { MessageModel } from "@models/MessageModel";

/**
 * Модель чата
 */
export interface ChatModel {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message: MessageModel;
}
