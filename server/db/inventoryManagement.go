package db

import (
	"errors"
	"fmt"
	"github.com/shopspring/decimal"
	"myModule/lib"
	"myModule/types"
	"strconv"
	"strings"
)

func AddInventory(name, supplierName, goodsTypesName, unitName, costPrice, sellingPrice, guidePrice string, inventory, minPackages int64, supplierID, goodsTypesID, unitID int) error {
	if name == "" {
		return errors.New("商品名称不能为空！")
	}
	zeroD := decimal.NewFromInt(0)
	if d1, _ := decimal.NewFromString(costPrice); d1.Cmp(zeroD) < 0 {
		return errors.New("成本价不能小于0！")
	}
	if d1, _ := decimal.NewFromString(sellingPrice); d1.Cmp(zeroD) < 0 {
		return errors.New("销售价不能小于0！")
	}
	if d1, _ := decimal.NewFromString(guidePrice); d1.Cmp(zeroD) < 0 {
		return errors.New("指导价不能小于0！")
	}
	if inventory <= 0 {
		return errors.New("库存量不能小于等于0！")
	}
	if minPackages <= 0 {
		return errors.New("最小包装数不能小于等于0！")
	}
	if supplierID == -1 {
		fmt.Println("添加", supplierName)
	}
	if goodsTypesID == -1 {
		fmt.Println("添加", goodsTypesName)
	}
	if unitID == -1 {
		fmt.Println("添加unit", unitName)
	}
	var newInventory types.InventoryManagement
	res := DB.Where("name = ?", name).First(&newInventory)

	if res.Error != nil {
		newInventory = types.InventoryManagement{
			Name:             name,
			Pinyin:           lib.Pinyin(name),
			CostPrice:        costPrice,
			AverageCostPrice: costPrice,
			SellingPrice:     sellingPrice,
			GuidePrice:       guidePrice,
			Inventory:        inventory,
			MinPackages:      minPackages,
			SupplierID:       supplierID,
			GoodsTypesID:     goodsTypesID,
			UnitID:           unitID,
		}
		res = DB.Create(&newInventory)
	} else {
		i1 := decimal.NewFromInt(newInventory.Inventory)
		i2 := decimal.NewFromInt(inventory)
		costPrices := append(strings.Split(newInventory.CostPrice, ","), costPrice)
		initCostPrice := decimal.NewFromInt(0)
		for _, str := range costPrices {
			currentNum, _ := decimal.NewFromString(str)
			initCostPrice = initCostPrice.Add(currentNum)
		}
		res = DB.Model(&newInventory).Updates(types.InventoryManagement{
			CostPrice:        strings.Join(costPrices, ","),
			AverageCostPrice: initCostPrice.Div(decimal.NewFromInt(int64(len(costPrices)))).Round(2).String(),
			SellingPrice:     sellingPrice,
			GuidePrice:       guidePrice,
			Inventory:        i1.Add(i2).IntPart(),
			MinPackages:      minPackages,
			SupplierID:       supplierID,
			GoodsTypesID:     goodsTypesID,
			UnitID:           unitID,
		})
	}

	if res.Error != nil {
		return res.Error
	}
	return nil
}

func GetInventoryByName(query string) ([]types.InventoryNameRes, error) {
	var res []types.InventoryNameRes
	var inventories []types.InventoryManagement

	dbFind := DB.Where("name LIKE ?", "%"+query+"%").Or("pinyin LIKE ?", "%"+query+"%").Find(&inventories)

	for _, s := range inventories {
		costPrices := strings.Split(s.CostPrice, ",")
		costPrice, _ := strconv.ParseFloat(costPrices[len(costPrices)-1], 64)
		sellingPrice, _ := strconv.ParseFloat(s.SellingPrice, 64)
		guidePrice, _ := strconv.ParseFloat(s.GuidePrice, 64)
		res = append(res, types.InventoryNameRes{
			ID:           s.ID,
			Name:         s.Name,
			CostPrice:    costPrice,
			SellingPrice: sellingPrice,
			GuidePrice:   guidePrice,
			MinPackages:  s.MinPackages,
			SupplierID:   s.SupplierID,
			GoodsTypesID: s.GoodsTypesID,
			UnitID:       s.UnitID,
		})
	}
	if len(res) == 0 {
		res = []types.InventoryNameRes{}
	}
	return res, dbFind.Error
}
