import { AddUsersToChatModel } from "@models/AddUserToChatModel";
import { ChatModel } from "@models/ChatModel";
import { TokenModel } from "@models/TokenModel";
import { UserWithIdModel } from "@models/UserWithIdModel";
import { BaseApiService } from "@services/BaseApiService";
import { HTTP, HttpMethodResp } from "@utils/HttpTransport";

class ChatsService extends BaseApiService {
  getChats() {
    return HTTP.get(this.restUrl("chats"), {
      headers: { "Content-Type": "application/json" },
    }) as HttpMethodResp<ChatModel[]>;
  }

  addUsersToChat(data: AddUsersToChatModel) {
    return HTTP.put(this.restUrl("chats/users"), {
      headers: { "Content-Type": "application/json" },
      data,
    });
  }

  getChatUsers(chatId: number) {
    return HTTP.get(this.restUrl(`chats/${chatId}/users`), {
      headers: { "Content-Type": "application/json" },
    }) as HttpMethodResp<UserWithIdModel[]>;
  }

  deleteChatUsers(data: AddUsersToChatModel) {
    return HTTP.delete(this.restUrl("chats/users"), {
      headers: { "Content-Type": "application/json" },
      data,
    });
  }

  getChatToken(chatId: number) {
    return HTTP.post(this.restUrl(`chats/token/${chatId}`), {
      headers: { "Content-Type": "application/json" },
    }) as HttpMethodResp<TokenModel>;
  }

  addChat(chatName: string) {
    return HTTP.post(this.restUrl("chats"), {
      headers: { "Content-Type": "application/json" },
      data: { title: chatName },
    });
  }

  deleteChat(chatId: number) {
    return HTTP.delete(this.restUrl("chats"), {
      headers: { "Content-Type": "application/json" },
      data: { chatId },
    });
  }

  setAvatar(chatId: number, file: File) {
    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("chatId", chatId.toString());
    return HTTP.put(this.restUrl("chats/avatar"), {
      data: formData,
    }) as HttpMethodResp<ChatModel>;
  }
}

const instance = new ChatsService();
export { instance as ChatsService };
