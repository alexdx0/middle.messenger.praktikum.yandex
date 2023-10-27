import { AppStore } from "@Core/AppStore";
import { AddUsersToChatModel } from "@models/AddUserToChatModel";
import { ChatsService } from "@services/ChatsService";
import { apiErrorHandler } from "@utils/apiErrorHandler";

class ChatsController {
  getChats() {
    return ChatsService.getChats()
      .then((data) => AppStore.set({ chats: data.response }))
      .catch((error: Error) => {
        apiErrorHandler(error);
        return Promise.reject(error);
      });
  }

  addUserToChat(data: AddUsersToChatModel) {
    return ChatsService.addUsersToChat(data)
      .catch((error: Error) => {
        apiErrorHandler(error);
        return Promise.reject(error);
      });
  }

  getChatUsers(chatId: number) {
    return ChatsService.getChatUsers(chatId)
      .catch((error: Error) => {
        apiErrorHandler(error);
        return Promise.reject(error);
      });
  }

  deleteChatUsers(data: AddUsersToChatModel) {
    return ChatsService.deleteChatUsers(data)
      .catch((error: Error) => {
        apiErrorHandler(error);
        return Promise.reject(error);
      });
  }

  getChatToken(chatId: number) {
    return ChatsService.getChatToken(chatId)
      .catch((error: Error) => {
        apiErrorHandler(error);
        return Promise.reject(error);
      });
  }
}

const instance = new ChatsController();
export { instance as ChatsController };
