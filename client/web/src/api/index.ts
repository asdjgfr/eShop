import axios from "axios";
import qs from "qs";

export const post = function (url: string, data?: any) {
  return axios
    .post(url, qs.stringify(data), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((res) => res.data);
};
