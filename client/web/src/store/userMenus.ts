import { action, observable } from "mobx";

interface userMenu {
  // 标题
  title: string;
  // key值
  key: string;
  path: string;
  children?: userMenu[];
}
interface userMenus {
  // 菜单
  menus: userMenu[];
}

class UserMenus implements userMenus {
  @observable public menus: userMenu[] = [];

  @action.bound setUserMenus(menus: userMenu[] = []) {
    this.menus = menus;
  }
}

export default new UserMenus();
