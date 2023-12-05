import { CardMessageModel } from "@models/CardMessageModel";
import { ChatModel } from "@models/ChatModel";
import { UserWithIdModel } from "@models/UserWithIdModel";

export class AppStoreModel {
  /** Какая-нибудь ошибка */
  error: string | undefined = undefined;
  /** Текущий пользователь */
  user: UserWithIdModel | undefined = undefined;
  /** Признак открытого всплывающего окна контекстного меню чата */
  isChatContextPopupOpened: boolean = false;
  /** Признак открытого всплывающего окна контекстного меню прикрепления материалов к сообщению */
  isAttachPopupOpened: boolean = false;
  /** Все чаты, доступные пользователю */
  chats: ChatModel[] = [];
  /** Текущий выбранный чат */
  currentChat: ChatModel | undefined = undefined;
  /** Токен чата */
  token: string = "";
  /** Сообщения */
  messages: CardMessageModel[] = [];
}
