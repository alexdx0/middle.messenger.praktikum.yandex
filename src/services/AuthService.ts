import { BaseApiService } from "@services/BaseApiService";
import HTTP from "@utils/HttpTransport";

class AuthService extends BaseApiService {
  getUserInfo() {
    return HTTP.get(this.restUrl("auth/user"));
  }
}

const instance = new AuthService();
export { instance as AuthService };
