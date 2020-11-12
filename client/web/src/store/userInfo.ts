import { action, observable } from "mobx";

interface userInfo {
  username: string;
  email: string;
  phone: string;
  role: number;
  birthday: string;
}

class UserInfo implements userInfo {
  @observable public username: string = "";
  @observable public email: string = "";
  @observable public phone: string = "";
  @observable public role: number = -1;
  @observable public birthday: string = "";

  @action.bound setUserInfo(
    userInfo: userInfo = {
      username: "",
      email: "",
      phone: "",
      role: -1,
      birthday: "",
    }
  ) {
    this.username = userInfo.username;
    this.email = userInfo.email;
    this.phone = userInfo.phone;
    this.role = userInfo.role;
    this.birthday = userInfo.birthday;
  }
}

export default new UserInfo();
