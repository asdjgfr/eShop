import router from "@/router";
import { RawLocation, Route } from "vue-router";

export const routeTo = async function (
  location: RawLocation | -1
): Promise<Route | void> {
  if (location === -1) {
    return router.back();
  } else {
    return await router.push(location);
  }
};
