import { post } from "./index";

interface IIDAndName {
  id: undefined | number;
  name: string;
}

export interface IInventoryData {
  name: string;
  inventory: number;
  costPrice: number;
  sellingPrice: number;
  guidePrice: number;
  minPackages: number;
  supplier: IIDAndName;
  goodsTypes: IIDAndName;
  unit: IIDAndName;
}

export const addInventory = function (data: IInventoryData) {
  return post("/api/add-inventory", data);
};
