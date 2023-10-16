import { AppStore } from "@app/AppStore";
import { ModalService } from "@app/Modals/ModalService";
import { userSignUpModel } from "@models/api/userSignUpModel";
import { AuthService } from "@services/AuthService";

class AuthController {
  getUserInfo() {
    return AuthService.getUserInfo();
  }

  signIn(login: string, password: string) {
    return AuthService.signIn(login, password)
      .then(() => this.getUserInfo())
      .then((data) => AppStore.set({ user: data.response }))
      .catch((error: Error) => {
      // 409 reason: "Login already exists"
        ModalService.show("info-modal", { message: error.message });
        return Promise.reject(error);
      });
  }

  signUp(user: userSignUpModel) {
    AuthService.signUp(user)
      .then((data) => {
        console.log("data", data);
      })
      .catch((error: Error) => {
        // 409 reason: "Login already exists"
        ModalService.show("info-modal", { message: error.message });
      });
  }

  logout() {
    AuthService.logout();
  }
}

const instance = new AuthController();
export { instance as AuthController };
