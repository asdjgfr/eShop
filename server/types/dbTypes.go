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

type Logger struct {
	gorm.Model
	Level       string `gorm:"comment:日志等级"`
	Path        string `gorm:"comment:访问的接口"`
	Username    string `gorm:"comment:用户名"`
	IP          string `gorm:"comment:IP地址"`
	UA          string `gorm:"comment:ua"`
	Description string `gorm:"comment:说明"`
}
type Supplier struct {
	gorm.Model
	Name     string `gorm:"comment:供货商名称"`
	Contacts string `gorm:"comment:联系方式"`
	Address  string `gorm:"comment:地址"`
	Pinyin   string `gorm:"comment:拼音"`
	Remarks  string `gorm:"comment:备注"`
}
type GoodsTypes struct {
	gorm.Model
	Name    string `gorm:"comment:商品类型名称"`
	Pinyin  string `gorm:"comment:拼音"`
	Remarks string `gorm:"comment:备注"`
}
type Unit struct {
	gorm.Model
	Name    string `gorm:"comment:商品类型名称"`
	Pinyin  string `gorm:"comment:拼音"`
	Remarks string `gorm:"comment:备注"`
}
type InventoryManagement struct {
	gorm.Model
	Name              string    `gorm:"comment:商品名称"`
	Code              string    `gorm:"comment:商品代码"`
	Pinyin            string    `gorm:"comment:商品名称拼音"`
	CostPrice         string    `gorm:"comment:成本价"`
	AverageCostPrice  string    `gorm:"comment:平均成本价"`
	TotalCostPrice    string    `gorm:"comment:成本总价"`
	SellingPrice      string    `gorm:"comment:销售价"`
	GuidePrice        string    `gorm:"comment:指导价"`
	Inventory         int64     `gorm:"comment:库存量"`
	MinPackages       int64     `gorm:"comment:最小包装数"`
	SupplierID        int       `gorm:"comment:供货商ID"`
	GoodsTypesID      int       `gorm:"comment:商品类型ID"`
	UnitID            int       `gorm:"comment:单位ID"`
	Remarks           string    `gorm:"comment:注释"`
	LatestStorageTime time.Time `gorm:"comment:最新入库时间"`
	LatestTime        time.Time `gorm:"comment:最新出库时间"`
}
