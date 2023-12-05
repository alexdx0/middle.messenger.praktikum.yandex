import { PasswordChangeModel } from "@models/PasswordChangeModel";
import { UserModel } from "@models/UserModel";
import { UserWithIdModel } from "@models/UserWithIdModel";
import { BaseApiService } from "@services/BaseApiService";
import { HTTP, HttpMethodResp } from "@Core/HttpTransport";

class UserService extends BaseApiService {
  setAvatar(file: File) {
    const formData = new FormData();
    formData.append("avatar", file);
    return HTTP.put(this.restUrl("user/profile/avatar"), {
      data: formData,
    }) as HttpMethodResp<UserWithIdModel>;
  }

  changeUserProfile(user: UserModel) {
    return HTTP.put(this.restUrl("user/profile"), {
      headers: { "Content-Type": "application/json" },
      data: user,
    }) as HttpMethodResp<UserWithIdModel>;
  }

  changeUserPassword(data: PasswordChangeModel) {
    return HTTP.put(this.restUrl("user/password"), {
      headers: { "Content-Type": "application/json" },
      data,
    }) as HttpMethodResp<UserModel>;
  }

  searchUser(login: string) {
    return HTTP.post(this.restUrl("user/search"), {
      headers: { "Content-Type": "application/json" },
      data: {
        login,
      },
    }) as HttpMethodResp<UserWithIdModel[]>;
  }
}

const instance = new UserService();
export { instance as UserService };
