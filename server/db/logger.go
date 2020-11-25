package db

import "myModule/types"

func SaveLogger(log types.Logger) {
	DB.Create(&log)
}
