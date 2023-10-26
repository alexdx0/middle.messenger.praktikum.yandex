import { UserModel } from "@models/UserModel";
import { BaseApiService } from "@services/BaseApiService";
import { HTTP } from "@utils/HttpTransport";

class UserService extends BaseApiService {
  setAvatar(file: File) {
    const formData = new FormData();
    formData.append("avatar", file);
    return HTTP.put<UserModel>(this.restUrl("user/profile/avatar"), {
      data: formData,
    });
  }
}

const instance = new UserService();
export { instance as UserService };
