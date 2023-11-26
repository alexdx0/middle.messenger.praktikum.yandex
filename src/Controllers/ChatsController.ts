import { AppStore } from "@Core/AppStore";
import { AddUsersToChatModel } from "@models/AddUserToChatModel";
import { ChatsService } from "@services/ChatsService";

class ChatsController {
  getChats() {
    return ChatsService.getChats()
      .then((data) => AppStore.set({ chats: data.response }));
  }

  addUserToChat(data: AddUsersToChatModel) {
    return ChatsService.addUsersToChat(data);
  }

  getChatUsers(chatId: number) {
    return ChatsService.getChatUsers(chatId);
  }

  deleteChatUsers(data: AddUsersToChatModel) {
    return ChatsService.deleteChatUsers(data);
  }

  getChatToken(chatId: number) {
    return ChatsService.getChatToken(chatId);
  }

  addChat(chatName: string) {
    return ChatsService.addChat(chatName);
  }

  deleteChat(chatId: number) {
    return ChatsService.deleteChat(chatId);
  }

  setAvatar(chatId: number, file: File) {
    return ChatsService.setAvatar(chatId, file);
  }
}

const instance = new ChatsController();
export { instance as ChatsController };
