import { PasswordChangeModel } from "@models/PasswordChangeModel";
import { UserModel } from "@models/UserModel";
import { UserWithIdModel } from "@models/UserWithIdModel";
import { BaseApiService } from "@services/BaseApiService";
import { HTTP } from "@utils/HttpTransport";

class UserService extends BaseApiService {
  setAvatar(file: File) {
    const formData = new FormData();
    formData.append("avatar", file);
    return HTTP.put<UserWithIdModel>(this.restUrl("user/profile/avatar"), {
      data: formData,
    });
  }

  changeUserProfile(user: UserModel) {
    return HTTP.put<UserWithIdModel>(this.restUrl("user/profile"), {
      headers: { "Content-Type": "application/json" },
      data: user,
    });
  }

  changeUserPassword(data: PasswordChangeModel) {
    return HTTP.put<UserModel>(this.restUrl("user/password"), {
      headers: { "Content-Type": "application/json" },
      data,
    });
  }

  searchUser(login: string) {
    return HTTP.post<UserWithIdModel[]>(this.restUrl("user/search"), {
      headers: { "Content-Type": "application/json" },
      data: {
        login,
      },
    });
  }
}

const instance = new UserService();
export { instance as UserService };
