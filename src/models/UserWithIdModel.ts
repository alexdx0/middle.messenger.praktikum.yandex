import { UserModel } from "@models/UserModel";

/**
 * Модель пользователя с идентификатором
 */
export interface UserWithIdModel extends UserModel {
  id: number;
}
