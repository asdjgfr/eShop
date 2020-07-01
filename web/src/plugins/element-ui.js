import ElementUI, { Loading } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
let tmpL = Loading.service();
const L = function(options = {}) {
  tmpL = Loading.service({
    fullscreen: true,
    lock: true,
    ...options
  });
  return tmpL;
};
L.close = function() {
  tmpL.close();
  return tmpL;
};
export default {
  ElementUI,
  Loading: L
};
