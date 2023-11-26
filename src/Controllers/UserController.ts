import { AppStore } from "@Core/AppStore";
import { Router } from "@app/appRouting";
import { PasswordChangeModel } from "@models/PasswordChangeModel";
import { UserModel } from "@models/UserModel";
import { UserService } from "@services/UserService";

class UserController {
  setAvatar(file: File) {
    return UserService.setAvatar(file)
      .then((data) => AppStore.set({ user: data.response }));
  }

  changeUserProfile(user: UserModel) {
    return UserService.changeUserProfile(user)
      .then((data) => {
        AppStore.set({ user: data.response });
        Router.go("/messenger");
      });
  }

  changeUserPassword(data: PasswordChangeModel) {
    return UserService.changeUserPassword(data)
      .then(() => {
        Router.go("/messenger");
      });
  }

  searchUser(login: string) {
    return UserService.searchUser(login)
      .then((data) => {
        return data.response;
      });
  }
}

const instance = new UserController();
export { instance as UserController };
