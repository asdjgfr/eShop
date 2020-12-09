import dayjs from "dayjs";

export const sleep = function (time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
};

/**
 * 同步setState
 * */
export const syncSetState = function (data: object) {
  return new Promise((resolve) => {
    if (this?.setState) {
      this?.setState(data, resolve);
    } else {
      resolve(false);
    }
  });
};

/**
 * 价格格式化
 * */
export const priceFormatter = function (value: number) {
  return `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * 价格格式化
 * */
export const priceParse = function (value: number | string | undefined) {
  value = value ?? "";
  return (value + "").replace(/￥\s?|(,*)/g, "");
};

// 通用时间格式化

export const formatTime = function (fmtStr: string, template?: string) {
  return dayjs(fmtStr).format(template ?? "YYYY-MM-DD HH:mm:ss");
};
