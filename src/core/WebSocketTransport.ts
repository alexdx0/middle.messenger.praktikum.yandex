import { MessageModel } from "@models/MessageModel";

/**
 * Класс API обмена сообщениями
 */
export default class WebSocketTransport {
  private socket?: WebSocket;
  private _userId?: number;
  private _chatId?: number;
  private _token?: string;
  private keepAlive?: NodeJS.Timeout;
  private _callback?: (messages: MessageModel[]) => void;
  // eslint-disable-next-line no-use-before-define
  public static __instance: WebSocketTransport | null = null;

  constructor(userId: number, chatId: number, token: string, updater?: (messages: MessageModel[]) => void) {
    if (WebSocketTransport.__instance && WebSocketTransport.__instance.checkCurrentInstance(userId, chatId, token)) {
      return WebSocketTransport.__instance;
    } else if (WebSocketTransport.__instance) {
      WebSocketTransport.__instance.closeConnection();
    }
    this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
    this.keepAlive = setInterval(() => {
      this.socket?.send("");
    }, 5000);
    this.open();
    this.getMessage();
    this.close();
    this.error();
    this._callback = updater;
    WebSocketTransport.__instance = this;
  }

  /**
     * Открыть соединение
     */
  private open() {
    this.socket?.addEventListener("open", () => {
      console.log("Соединение установлено");
      this.getOldMessages();
    });
  }

  /**
     * Получить старые сообщения
     */
  private getOldMessages() {
    this.sendMessage("", "get old");
  }

  /**
     * Получить новое сообщение
     */
  private getMessage() {
    this.socket?.addEventListener("message", (event) => {
      const parsedData = JSON.parse(event.data);
      if (!this._callback) {
        return;
      }
      this._callback(Array.isArray(parsedData) ? parsedData : [parsedData]);
    });
  }

  /**
     * Закрытие соединения
     */
  private close() {
    this.socket?.addEventListener("close", (event) => {
      if (event.wasClean) {
        console.log("Соединение закрыто чисто");
      } else {
        console.log("Обрыв соединения");
      }
      clearInterval(this.keepAlive);
      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });
  }

  /**
     * Ошибка соединения
     */
  private error() {
    this.socket?.addEventListener("error", (event) => {
      console.log("Ошибка", (event as unknown as { message?: string })?.message);
    });
  }

  /**
     * Дождаться установки соединения
     */
  private waitForConnection(callback: () => void, interval: number) {
    if (this.socket?.readyState === 1) {
      callback();
    } else {
      setTimeout(() => {
        this.waitForConnection(callback, interval);
      }, interval);
    }
  }

  /**
     * Отправить сообщение
     */
  sendMessage(message: string, type: string = "message") {
    this.waitForConnection(() => {
      this.socket?.send(JSON.stringify({
        content: message,
        type,
      }));
    }, 1000);
  }

  /**
     * Проверить, необходимость пересоздания инстанса API
     */
  checkCurrentInstance(userId: number, chatId: number, token: string) {
    return this._chatId === chatId && this._userId === userId && this._token === token;
  }

  /**
     * Закрыть соединение
     */
  closeConnection() {
    this.socket?.close();
  }
}
