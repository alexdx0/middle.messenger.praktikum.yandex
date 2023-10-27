import { UserWithIdModel } from "@models/UserWithIdModel";
import { userSignUpModel } from "@models/userSignUpModel";
import { BaseApiService } from "@services/BaseApiService";
import { HTTP } from "@utils/HttpTransport";

class AuthService extends BaseApiService {
  getUserInfo() {
    return HTTP.get<UserWithIdModel>(this.restUrl("auth/user"), {
      headers: { "Content-Type": "application/json" },
    });
  }

  signIn(login: string, password: string) {
    return HTTP.post(this.restUrl("auth/signin"), {
      data: {
        login,
        password,
      },
      headers: { "Content-Type": "application/json" },
    });
  }

  signUp(user: userSignUpModel) {
    return HTTP.post(this.restUrl("auth/signup"), {
      data: { ...user },
      headers: { "Content-Type": "application/json" },
      // id : 1347115
    });
  }

  logout() {
    return HTTP.post(this.restUrl("auth/logout"), {
      headers: { "Content-Type": "application/json" },
    });
  }
}

const instance = new AuthService();
export { instance as AuthService };
