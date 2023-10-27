import { AppStore } from "@Core/AppStore";
import { Router } from "@app/appRouting";
import { PasswordChangeModel } from "@models/PasswordChangeModel";
import { UserModel } from "@models/UserModel";
import { UserService } from "@services/UserService";
import { apiErrorHandler } from "@utils/apiErrorHandler";

class UserController {
  setAvatar(file: File) {
    return UserService.setAvatar(file)
      .then((data) => AppStore.set({ user: data.response }))
      .catch((error: Error) => {
        apiErrorHandler(error);
        return Promise.reject(error);
      });
  }

  changeUserProfile(user: UserModel) {
    return UserService.changeUserProfile(user)
      .then((data) => {
        AppStore.set({ user: data.response });
        Router.go("/messenger");
      })
      .catch((error: Error) => {
        apiErrorHandler(error);
        return Promise.reject(error);
      });
  }

  changeUserPassword(data: PasswordChangeModel) {
    return UserService.changeUserPassword(data)
      .then(() => {
        Router.go("/messenger");
      })
      .catch((error: Error) => {
        apiErrorHandler(error);
        return Promise.reject(error);
      });
  }

  searchUser(login: string) {
    return UserService.searchUser(login)
      .then((data) => {
        return data.response;
      })
      .catch((error: Error) => {
        apiErrorHandler(error);
        return Promise.reject(error);
      });
  }
}

const instance = new UserController();
export { instance as UserController };
