export const sleep = function (time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
};

/**
 * 同步setState
 * */
export const syncSetState = (data: object) => {
  const that: any = this;
  return new Promise((resolve) => {
    if (that?.setState) {
      that?.setState(data, resolve);
    } else {
      resolve(false);
    }
  });
};
