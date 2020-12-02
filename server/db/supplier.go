package db

import (
	"myModule/types"
)

func GetSupplier(query string) ([]types.SupplierRes, error) {
	var res []types.SupplierRes
	var suppliers []types.Supplier

	dbFind := DB.Where("name LIKE ?", "%"+query+"%").Or("pinyin LIKE ?", "%"+query+"%").Find(&suppliers)

	for _, s := range suppliers {
		res = append(res, types.SupplierRes{
			ID:        s.ID,
			Name:      s.Name,
			Contacts:  s.Contacts,
			Address:   s.Address,
			Pinyin:    s.Pinyin,
			Remarks:   s.Remarks,
			CreatedAt: s.CreatedAt,
		})
	}
	if len(res) == 0 {
		res = []types.SupplierRes{}
	}
	return res, dbFind.Error
}
