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
