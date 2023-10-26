import { AppStore } from "@Core/AppStore";
import { ModalService } from "@app/Modals/ModalService";
import { UserService } from "@services/UserService";

class UserController {
  setAvatar(file: File) {
    return UserService.setAvatar(file)
      .then((data) => AppStore.set({ user: data.response }))
      .catch((error: Error) => {
        ModalService.show("info-modal", { message: error.message ?? "Произошла какая-то ошибка" });
        return Promise.reject(error);
      });
  }
}

const instance = new UserController();
export { instance as UserController };
