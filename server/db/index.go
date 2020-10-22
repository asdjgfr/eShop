package db

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"myModule/types"
)

//数据库文件
var DB *gorm.DB

func InitDB(config types.DbConfig) {
	var err error
	dsn := config.User + ":" + config.Password + "@tcp(127.0.0.1:3306)/" + config.DbName + "?charset=utf8mb4&parseTime=True&loc=Local"
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		fmt.Println("数据库连接失败: ", err)
	}
	_ = DB.AutoMigrate(&types.User{})
}
