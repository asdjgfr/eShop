import React from "react";
interface animate {
  delay: number;
}
interface contextVal {
  lang: string;
  animate: animate;
}

export const defaultValue = { lang: "zh-CN", animate: { delay: 300 } };
const context = React.createContext<contextVal>(defaultValue);

export default context;
