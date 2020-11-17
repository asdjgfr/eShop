package db

import (
	"fmt"
	"gorm.io/gorm"
	"myModule/lib"
	"myModule/types"
	"time"
)

func InitAdminUser(db *gorm.DB) {
	//初始化管理员账户
	_ = db.AutoMigrate(&types.User{})
	var userInfo types.User
	result := db.First(&userInfo)
	if result.Error != nil {
		newUser := types.User{
			Username: "admin",
			Password: "Aa123456",
			Phone:    "",
			Email:    "",
			Role:     1,
			Avatar:   "",
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

func InitShopInfo(db *gorm.DB) {
	//初始化店铺信息
	_ = db.AutoMigrate(&types.ShopInfo{})
	var shopInfo types.ShopInfo
	result := db.First(&shopInfo)
	if result.Error != nil {
		info := types.ShopInfo{Name: "欣念", Introduction: "说明", Suffix: "智慧门店"}
		_ = db.Create(&info)
	}
}

func InitDashboardMenus(db *gorm.DB) {
	//初始化菜单
	_ = db.AutoMigrate(&types.DashboardMenu{})
	var dashboardMenu types.DashboardMenu
	result := db.First(&dashboardMenu)
	if result.Error != nil {
		defaultMenus := []types.DashboardMenu{
			{Title: "资产分析", Path: "/dashboard/analysis", Icon: "LineChartOutlined", Order: 1},
			{Title: "订单管理", Path: "/dashboard/order-management", Icon: "FileTextOutlined", Order: 2},
			{Title: "个人中心", Path: "/dashboard/center", Icon: "UserOutlined", Order: 3},
			{Title: "系统设置", Path: "/dashboard/settings", Icon: "SettingOutlined", Order: 4},
		}
		for _, m := range defaultMenus {
			menu := types.DashboardMenu{Title: m.Title, Path: m.Path, Icon: m.Icon}
			_ = DB.Create(&menu)
		}
	}
}

func InitUserMessages(db *gorm.DB) {
	//初始化消息表
	_ = db.AutoMigrate(&types.UserMessages{})
}
