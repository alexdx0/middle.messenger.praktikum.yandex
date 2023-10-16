import { ChatModel } from "@models/ChatModel";
import { BaseApiService } from "@services/BaseApiService";
import { HTTP } from "@utils/HttpTransport";

class ChatsService extends BaseApiService {
  getChats() {
    return HTTP.get<ChatModel[]>(this.restUrl("chats"), {
      headers: { "Content-Type": "application/json" },
      data: {
        offset: 0,
        limit: 50,
        title: "",
      },
    });
  }
}

const instance = new ChatsService();
export { instance as ChatsService };
