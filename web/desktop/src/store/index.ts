import { action, computed, observable } from "mobx";
import history from "@/store/history";
import i18n from "@/store/i18n";

class Store {
  // 被观察者，你可以理解成Vuex中的State，也就是说，声明一些想要观察的状态，变量。
  // 被观察者可以是：JS基本数据类型、引用类型、普通对象、类实例、数组和映射
  @observable public history = history;
  @observable public languages = i18n.languages;
  @observable public currentLanguage = i18n.currentLanguage;
  @observable public i18n = i18n[i18n.currentLanguage];
}
export default Store;
