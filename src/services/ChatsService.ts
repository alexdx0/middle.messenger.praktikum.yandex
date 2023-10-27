import { AddUsersToChatModel } from "@models/AddUserToChatModel";
import { ChatModel } from "@models/ChatModel";
import { TokenModel } from "@models/TokenModel";
import { UserWithIdModel } from "@models/UserWithIdModel";
import { BaseApiService } from "@services/BaseApiService";
import { HTTP } from "@utils/HttpTransport";

class ChatsService extends BaseApiService {
  getChats() {
    return HTTP.get<ChatModel[]>(this.restUrl("chats"), {
      headers: { "Content-Type": "application/json" },
    });
  }

  addUsersToChat(data: AddUsersToChatModel) {
    return HTTP.put(this.restUrl("chats/users"), {
      headers: { "Content-Type": "application/json" },
      data,
    });
  }

  getChatUsers(chatId: number) {
    return HTTP.get<UserWithIdModel[]>(this.restUrl(`chats/${chatId}/users`), {
      headers: { "Content-Type": "application/json" },
    });
  }

  deleteChatUsers(data: AddUsersToChatModel) {
    return HTTP.delete(this.restUrl("chats/users"), {
      headers: { "Content-Type": "application/json" },
      data,
    });
  }

  getChatToken(chatId: number) {
    return HTTP.post<TokenModel>(this.restUrl(`chats/token/${chatId}`), {
      headers: { "Content-Type": "application/json" },
    });
  }
}

const instance = new ChatsService();
export { instance as ChatsService };
