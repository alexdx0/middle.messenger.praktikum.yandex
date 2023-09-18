import { UserModel } from "@models/UserModel";

/**
 * Модель сообщения
 */
// TODO remove
export interface MessageModel {
  user: UserModel;
  time: string;
  content: string;
}
