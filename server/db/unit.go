package db

import (
	"errors"
	"myModule/types"
)

func GetUnit(query string) ([]types.UnitRes, error) {
	var res []types.UnitRes
	var unitArr []types.Unit

	dbFind := DB.Where("name LIKE ?", "%"+query+"%").Or("pinyin LIKE ?", "%"+query+"%").Find(&unitArr)

	for _, s := range unitArr {
		res = append(res, types.UnitRes{
			ID:        s.ID,
			Name:      s.Name,
			Pinyin:    s.Pinyin,
			Remarks:   s.Remarks,
			CreatedAt: s.CreatedAt,
		})
	}
	if len(res) == 0 {
		res = []types.UnitRes{}
	}
	return res, dbFind.Error
}

func AddUnit(unit types.Unit) (int, error) {
	unitID := -1
	if unit.Name == "" {
		return unitID, errors.New("单位不能为空！")
	}
	var iUnit types.Unit
	result := DB.Where("name = ?", unit.Name).First(&iUnit)
	err := result.Error
	if result.RowsAffected == 0 {
		result = DB.Create(&unit)
		unitID = int(unit.ID)
		err = result.Error
	} else if result.RowsAffected == 1 {
		unitID = int(iUnit.ID)
	}
	return unitID, err
}
