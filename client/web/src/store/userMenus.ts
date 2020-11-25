import { makeAutoObservable } from "mobx";

interface userMenu {
  // 标题
  title: string;
  path: string;
  parentID: string;
  icon: string;
  children?: userMenu[];
}
interface userMenus {
  // 菜单
  menus: userMenu[];
}

class UserMenus implements userMenus {
  public menus: userMenu[] = [];
  constructor() {
    makeAutoObservable(this);
  }
  setUserMenus(menus: userMenu[] = []) {
    this.menus.splice(0, this.menus.length, ...menus);
  }
}

export default new UserMenus();
