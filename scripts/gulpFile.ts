import type { TaskFunctionCallback } from "gulp";

/**
 * 初始化项目
 *
 * @param {Function} cb - 回调
 */
export function init(cb: TaskFunctionCallback) {
  console.log("初始化项目");
  cb();
}

export * from "./start";
