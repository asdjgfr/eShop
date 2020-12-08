package db

import (
	"errors"
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

func AddSupplier(supplier types.Supplier) error {
	var iSupplier types.Supplier
	result := DB.Where("name = ?", supplier.Name).First(&iSupplier)
	err := result.Error
	if result.RowsAffected == 0 {
		result = DB.Create(&supplier)
		err = result.Error
	} else if result.RowsAffected == 1 {
		err = errors.New("供货商已存在！")
	}
	return err
}
