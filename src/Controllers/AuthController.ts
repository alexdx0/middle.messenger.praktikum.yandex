import { AppStore } from "@Core/AppStore";
import { Router } from "@app/appRouting";
import { userSignUpModel } from "@models/userSignUpModel";
import { AuthService } from "@services/AuthService";
import { apiErrorHandler } from "@utils/apiErrorHandler";

class AuthController {
  getUserInfo() {
    return AuthService.getUserInfo()
      .then((data) => AppStore.set({ user: data.response }));
  }

  signIn(login: string, password: string) {
    return AuthService.signIn(login, password)
      .then(() => this.getUserInfo())
      .catch((error: Error) => {
        apiErrorHandler(error);
        return Promise.reject(error);
      });
  }

  signUp(user: userSignUpModel) {
    AuthService.signUp(user)
      .then(() => {
        this.getUserInfo();
        Router.go("/messenger");
      })
      .catch(apiErrorHandler);
  }

  logout() {
    return AuthService.logout()
      .then(() => Router.go("/"))
      .catch((error: Error) => {
        apiErrorHandler(error);
        return Promise.reject(error);
      });
  }
}

const instance = new AuthController();
export { instance as AuthController };
