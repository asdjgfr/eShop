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

func AddSupplier(supplier types.Supplier) (int, error) {
	supplierID := -1
	if supplier.Name == "" {
		return supplierID, errors.New("供货商名称不能为空！")
	}
	var iSupplier types.Supplier
	result := DB.Where("name = ?", supplier.Name).First(&iSupplier)
	err := result.Error
	if result.RowsAffected == 0 {
		result = DB.Create(&supplier)
		err = result.Error
		supplierID = int(supplier.ID)
	} else if result.RowsAffected == 1 {
		supplierID = int(iSupplier.ID)
	}
	return supplierID, err
}
