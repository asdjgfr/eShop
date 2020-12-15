package db

import (
	"errors"
	"github.com/shopspring/decimal"
	"myModule/lib"
	"myModule/types"
	"strconv"
	"strings"
	"time"
)

func AddInventory(inventoryName, supplierName, goodsTypesName, unitName, costPrice, sellingPrice, guidePrice string, inventory, minPackages int64, supplierID, goodsTypesID, unitID int) error {
	if inventoryName == "" {
		return errors.New("商品名称不能为空！")
	}
	zeroD := decimal.NewFromInt(0)
	if d1, _ := decimal.NewFromString(costPrice); d1.Cmp(zeroD) < 0 {
		return errors.New("成本价不能小于0！")
	} else {
		costPrice = d1.Round(2).String()
	}
	if d1, _ := decimal.NewFromString(sellingPrice); d1.Cmp(zeroD) < 0 {
		return errors.New("销售价不能小于0！")
	} else {
		sellingPrice = d1.Round(2).String()
	}
	if d1, _ := decimal.NewFromString(guidePrice); d1.Cmp(zeroD) < 0 {
		return errors.New("指导价不能小于0！")
	} else {
		guidePrice = d1.Round(2).String()
	}
	if inventory <= 0 {
		return errors.New("库存量不能小于等于0！")
	}
	if minPackages <= 0 {
		return errors.New("最小包装数不能小于等于0！")
	}
	if supplierID <= 0 {
		sID, supplierErr := AddSupplier(types.Supplier{Name: supplierName, Pinyin: lib.Pinyin(supplierName)})
		supplierID = sID
		if supplierErr != nil {
			return supplierErr
		}
	}
	if goodsTypesID <= 0 {
		gID, goodsTypesErr := AddGoodsTypes(types.GoodsTypes{Name: goodsTypesName, Pinyin: lib.Pinyin(goodsTypesName)})
		goodsTypesID = gID
		if goodsTypesErr != nil {
			return goodsTypesErr
		}
	}
	if unitID <= 0 {
		uID, unitErr := AddUnit(types.Unit{Name: unitName, Pinyin: lib.Pinyin(unitName)})
		unitID = uID
		if unitErr != nil {
			return unitErr
		}
	}
	var newInventory types.InventoryManagement
	res := DB.Where("name = ?", inventoryName).First(&newInventory)

	if res.RowsAffected == 0 {
		newInventory = types.InventoryManagement{
			Name:              inventoryName,
			Pinyin:            lib.Pinyin(inventoryName),
			CostPrice:         costPrice,
			AverageCostPrice:  costPrice,
			SellingPrice:      sellingPrice,
			GuidePrice:        guidePrice,
			Inventory:         inventory,
			MinPackages:       minPackages,
			SupplierID:        supplierID,
			GoodsTypesID:      goodsTypesID,
			UnitID:            unitID,
			LatestStorageTime: time.Now(),
			LatestTime:        "",
		}
		res = DB.Create(&newInventory)
	} else if res.RowsAffected == 1 {
		i1 := decimal.NewFromInt(newInventory.Inventory)
		i2 := decimal.NewFromInt(inventory)
		costPrices := append(strings.Split(newInventory.CostPrice, ","), costPrice)
		initCostPrice := decimal.NewFromInt(0)
		for _, str := range costPrices {
			currentNum, _ := decimal.NewFromString(str)
			initCostPrice = initCostPrice.Add(currentNum)
		}
		res = DB.Model(&newInventory).Updates(types.InventoryManagement{
			CostPrice:         strings.Join(costPrices, ","),
			AverageCostPrice:  initCostPrice.Div(decimal.NewFromInt(int64(len(costPrices)))).Round(2).String(),
			SellingPrice:      sellingPrice,
			GuidePrice:        guidePrice,
			Inventory:         i1.Add(i2).IntPart(),
			MinPackages:       minPackages,
			SupplierID:        supplierID,
			GoodsTypesID:      goodsTypesID,
			UnitID:            unitID,
			LatestStorageTime: time.Now(),
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

func GetInventoryList(limit, offset int) ([]types.InventoryNameRes, int64, error) {
	var im []types.InventoryManagement
	var imRes []types.InventoryNameRes
	var count int64
	var err error
	DB.Model(&types.InventoryManagement{}).Count(&count)
	res := DB.Limit(limit).Offset(offset).Find(&im)
	if res.Error != nil {
		err = errors.New("获取库存列表失败：" + res.Error.Error())
	}

	for _, i := range im {
		sellingPrice, _ := strconv.ParseFloat(i.SellingPrice, 64)
		guidePrice, _ := strconv.ParseFloat(i.GuidePrice, 64)
		averageCostPrice, _ := strconv.ParseFloat(i.AverageCostPrice, 64)
		var costPrices []float64
		for _, costPrice := range strings.Split(i.CostPrice, ",") {
			cp, _ := strconv.ParseFloat(costPrice, 64)
			costPrices = append(costPrices, cp)
		}
		imRes = append(imRes, types.InventoryNameRes{
			ID:                i.ID,
			Name:              i.Name,
			CostPrices:        costPrices,
			AverageCostPrice:  averageCostPrice,
			SellingPrice:      sellingPrice,
			GuidePrice:        guidePrice,
			MinPackages:       i.MinPackages,
			Inventory:         i.Inventory,
			LatestStorageTime: i.LatestStorageTime,
			LatestTime:        i.LatestTime,
		})
	}

	if len(imRes) == 0 {
		imRes = []types.InventoryNameRes{}
	}
	return imRes, count, err
}

func DeleteInventoryByID(id int) error {
	res := DB.Delete(&types.InventoryManagement{}, id)
	return res.Error
}

func BatchAddInventory(inventories []types.BatchAddInventory) (string, int, int, int) {
	totalLen := len(inventories)
	errorLen := 0
	errorMsg := ""
	for index, inv := range inventories {
		msg := ""
		if inv.Name == "" {
			msg += "第" + strconv.Itoa(index+1) + "条名称为空;"
		}
		if inv.Inventory == 0 {
			msg += "第" + strconv.Itoa(index+1) + "条库存量为空;"
		}
		if inv.SellingPrice == "" {
			msg += "第" + strconv.Itoa(index+1) + "条销售价为空;"
		}
		if inv.GuidePrice == "" {
			msg += "第" + strconv.Itoa(index+1) + "条指导价为空;"
		}
		if inv.MinPackages == 0 {
			inv.MinPackages = 1
		}
		if msg != "" {
			errorLen++
			errorMsg += msg
			continue
		}
		err := AddInventory(inv.Name, inv.SupplierName, inv.GoodsTypesName, inv.UnitName, inv.CostPrice.String(), inv.SellingPrice.String(), inv.GuidePrice.String(), inv.Inventory, inv.MinPackages, -1, -1, -1)
		if err != nil {
			errorLen++
			msg += "第" + strconv.Itoa(index+1) + "条添加失败：" + err.Error() + ";"
			errorMsg += msg
		}
	}
	return errorMsg, totalLen, totalLen - errorLen, errorLen
}
