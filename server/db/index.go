package db

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"myModule/lib"
	"myModule/types"
	"time"
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
	_ = DB.AutoMigrate(&types.ShopInfo{})
	initDBData(DB)
}
func initDBData(db *gorm.DB) {
	//需要初始化的数据库数据
	initShopInfo(db)
}

func initShopInfo(db *gorm.DB) {
	//没有门店信息的时候新建一条
	var shopInfo types.ShopInfo
	result := db.First(&shopInfo)
	if result.Error != nil {
		info := types.ShopInfo{Name: "欣念", Introduction: "说明", Suffix: "智慧门店"}
		_ = db.Create(&info)
	}

	var userInfo types.User
	result = db.First(&userInfo)
	if result.Error != nil {
		newUser := types.User{
			Username: "admin",
			Password: "Aa123456",
			Phone:    "",
			Email:    "",
			Role:     1,
			Birthday: time.Now(),
		}
		salt, pas := lib.EncryptionString(newUser.Password)
		newUser.Password = pas
		newUser.Salt = salt
		res := DB.Create(&newUser)
		if res.Error != nil {
			fmt.Println("新建默认账户数据库写入错误！")
		} else {
			fmt.Println("新建默认账户成功！")
		}
	}
}
