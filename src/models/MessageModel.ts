import { UserModel } from "@models/UserModel";

/**
 * Модель сообщения
 */
export interface MessageModel {
  user: UserModel;
  time: string;
  content: string;
}
