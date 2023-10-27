import { AppStore } from "@Core/AppStore";
import { Router } from "@app/appRouting";
import { userSignUpModel } from "@models/userSignUpModel";
import { AuthService } from "@services/AuthService";
import { apiErrorHandler } from "@utils/apiErrorHandler";

class AuthController {
  getUserInfo() {
    return AuthService.getUserInfo();
  }

  signIn(login: string, password: string) {
    return AuthService.signIn(login, password)
      .then(() => this.getUserInfo())
      .then((data) => AppStore.set({ user: data.response }))
      .catch((error: Error) => {
        apiErrorHandler(error);
        return Promise.reject(error);
      });
  }

  signUp(user: userSignUpModel) {
    AuthService.signUp(user)
      .then((data) => {
        console.log("data", data);
        this.getUserInfo().then((data) => {
          AppStore.set({ user: data.response });
          Router.go("/settings");
        });
      })
      .catch(apiErrorHandler);
  }

  // logout() {
  //   AuthService.logout();
  // }
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
