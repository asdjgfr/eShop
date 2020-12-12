package db

import (
	"errors"
	"myModule/types"
)

func GetGoodTypes(query string) ([]types.GoodsTypesRes, error) {
	var res []types.GoodsTypesRes
	var goodsTypes []types.GoodsTypes

	dbFind := DB.Where("name LIKE ?", "%"+query+"%").Or("pinyin LIKE ?", "%"+query+"%").Find(&goodsTypes)

	for _, s := range goodsTypes {
		res = append(res, types.GoodsTypesRes{
			ID:        s.ID,
			Name:      s.Name,
			Pinyin:    s.Pinyin,
			Remarks:   s.Remarks,
			CreatedAt: s.CreatedAt,
		})
	}
	if len(res) == 0 {
		res = []types.GoodsTypesRes{}
	}
	return res, dbFind.Error
}

func AddGoodTypes(goodTypes types.GoodsTypes) error {
	var iGoodTypes types.GoodsTypes
	result := DB.Where("name = ?", goodTypes.Name).First(&iGoodTypes)
	err := result.Error
	if result.RowsAffected == 0 {
		result = DB.Create(&goodTypes)
		err = result.Error
	} else if result.RowsAffected == 1 {
		err = errors.New("商品类型已存在！")
	}
	return err
}
