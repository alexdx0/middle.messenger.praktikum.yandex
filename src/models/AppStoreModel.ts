import { ChatModel } from "@models/ChatModel";
import { UserModel } from "@models/UserModel";

export interface AppStoreModel {
  error: string | null,
  user: UserModel | null,
  isOpenDialogChat: boolean,
  chats: ChatModel[]
}
