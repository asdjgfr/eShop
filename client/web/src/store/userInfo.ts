import { makeAutoObservable } from "mobx";

interface userInfo {
  username: string;
  email: string;
  phone: string;
  role: number;
  birthday: string;
}

class UserInfo implements userInfo {
  public username: string = "";
  public email: string = "";
  public phone: string = "";
  public role: number = -1;
  public birthday: string = "";
  constructor() {
    makeAutoObservable(this);
  }
  setUserInfo(
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
