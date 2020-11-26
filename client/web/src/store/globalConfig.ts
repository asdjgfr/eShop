import { makeAutoObservable } from "mobx";

interface iGlobalConfig {
  // 全局的加载
  loading: boolean;
  // 全局加载的自定义文字
  loadingTip: string;
}

class GlobalConfig implements iGlobalConfig {
  public loading = false;
  public loadingTip = "";
  constructor() {
    makeAutoObservable(this);
  }
  toggleLoading(bool?: boolean) {
    if (bool !== undefined) {
      this.loading = bool;
    } else {
      this.loading = !this.loading;
    }
    if (!this.loading) {
      this.loadingTip = "";
    }
  }
  setLoadingTip(tip: string) {
    this.loading = true;
    this.loadingTip = tip;
  }
}

const globalConfig = new GlobalConfig();
export default globalConfig;
