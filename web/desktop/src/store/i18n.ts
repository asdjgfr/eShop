interface I18n {
  currentLanguage: "zhCN";
  languages: {
    key: string;
    value: string;
  }[];
  zhCN: i18nMap;
}

interface i18nMap {
  test: string;
}

const i18n: I18n = {
  currentLanguage: "zhCN",
  languages: [
    {
      key: "zhCN",
      value: "简体中文",
    },
  ],
  zhCN: {
    test: "测试",
  },
};

export default i18n;
