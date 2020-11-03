export const sleep = function (time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
};
