package db

import (
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
