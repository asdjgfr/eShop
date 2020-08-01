export const getType = obj => {
  const type = Object.prototype.toString
    .call(obj)
    .match(/^\[object (.*)\]$/)[1]
    .toLowerCase();
  if (type === "string" && typeof obj === "object") return "object";
  if (obj === null) return "null";
  if (obj === undefined) return "undefined";
  return type;
};
