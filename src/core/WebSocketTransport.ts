import { MessageModel } from "@models/MessageModel";
import { isDev } from "@utils/isDev";

class WebSocketTransport {
  private _socket?: WebSocket | null;
  private _aliveIntervalId?: NodeJS.Timeout;
  private _userId?: number;
  private _chatId?: number;
  private _token?: string;
  private _updater?: (messages: MessageModel[]) => void;

  constructor() {
    this._addListeners();
  }

  private _addListeners() {
    // На открытие соединения
    this._socket?.addEventListener("open", () => {
      if (isDev()) {
        console.log("Соединение установлено");
      }
    });

    // На получение новых сообщений
    this._socket?.addEventListener("message", (event) => {
      const parsedData = JSON.parse(event.data);
      const messageType = JSON.parse(event.data).type;
      if (!this._updater || messageType === "pong" || messageType === "user connected") {
        return;
      }
      this._updater(Array.isArray(parsedData) ? parsedData : [parsedData]);
    });

    // На закрытие соединения
    this._socket?.addEventListener("close", (event) => {
      if (isDev()) {
        if (event.wasClean) {
          console.log("Соединение закрыто чисто");
        } else {
          console.log("Обрыв соединения");
        }
        console.log(`Код: ${event.code} | Причина: ${event.reason}`);
      }
      clearInterval(this._aliveIntervalId);
    });

    // На ошибку соединения
    this._socket?.addEventListener("error", (event) => {
      console.log("Ошибка", (event as unknown as { message?: string })?.message);
    });
  }

  private _getOldMessages() {
    this.sendMessage("", "get old");
  }

  private _waitForConnection(sendCb: () => void, interval: number) {
    if (this._socket?.readyState === 1) {
      sendCb();
    } else {
      setTimeout(() => {
        this._waitForConnection(sendCb, interval);
      }, interval);
    }
  }

  connect(userId: number, chatId: number, token: string, updater?: (messages: MessageModel[]) => void) {
    // Если новые параметры подключения - создаем новое подключение
    if (this._userId !== userId || this._chatId !== chatId || this._token !== token || this._updater !== updater) {
      this._socket?.close();
      this._socket = null;
      this._updater = updater;
      this._socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
      this._addListeners();
      this._getOldMessages();

      this._aliveIntervalId = setInterval(() => {
        this._socket?.send(JSON.stringify({ type: "ping" }));
      }, 5000);
    }
  }

  sendMessage(message: string, type: string = "message") {
    this._waitForConnection(() => {
      this._socket?.send(JSON.stringify({
        content: message,
        type,
      }));
    }, 1000);
  }
}

const instance = new WebSocketTransport();
export { instance as WebSocketTransport };
