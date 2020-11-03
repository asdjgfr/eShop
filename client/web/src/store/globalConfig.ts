import { action, observable } from "mobx";

interface globalConfig {
  // 全局的加载
  loading: boolean;
  // 全局加载的自定义文字
  loadingTip: string;
}

class GlobalConfig implements globalConfig {
  @observable public loading = false;
  @observable public loadingTip = "";

  @action.bound toggleLoading(bool?: boolean) {
    console.log(this.loading);
    if (bool !== undefined) {
      this.loading = bool;
    } else {
      this.loading = !this.loading;
    }
    if (!this.loading) {
      this.loadingTip = "";
    }
  }
  @action.bound setLoadingTip(tip: string) {
    this.loadingTip = tip;
  }
}
const globalConfig = new GlobalConfig();
export default globalConfig;
