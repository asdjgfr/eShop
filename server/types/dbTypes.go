package types

import (
	"gorm.io/gorm"
	"time"
)

//用户表
type User struct {
	gorm.Model
	//用户名
	Username string
	Password string
	Email    string
	Phone    string
	//角色
	Role     int
	Birthday time.Time
	//储存密码时的盐
	Salt string
	//头像地址
	Avatar string
	//菜单的ID集合
	Menus string
}

//店铺信息
type ShopInfo struct {
	gorm.Model
	Name string
	//门店简介
	Introduction string
	//首页的后缀
	Suffix string
	Phones string
	Email  string
}

//面板的菜单
type DashboardMenu struct {
	gorm.Model
	Title    string
	Path     string
	Icon     string
	ParentID int
	//排序依据
	Order int
}

//用户的消息
type UserMessages struct {
	gorm.Model
	Title       string `gorm:"comment:消息的标题"`
	Description string `gorm:"comment:消息详情"`
	Username    string `gorm:"comment:消息所属的用户名"`
	Read        bool   `gorm:"comment:是否已读"`
}

//用户角色
type UserRole struct {
	gorm.Model
	Name string `gorm:"comment:角色的名称"`
}
