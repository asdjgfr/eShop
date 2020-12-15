package types

import (
	"encoding/json"
	"time"
)

//公用类型
type (
	DbConfig struct {
		//数据库配置文件结构
		DbName   string
		User     string
		Password string
		Port     string
	}
	RedisConfig struct {
		//redis配置文件结构
		Addr     string
		Password string
		DB       int
	}
	CryptoConfig struct {
		//aes的key
		AES string
	}
	Config struct {
		//配置文件结构
		Db     DbConfig
		Port   int
		Redis  RedisConfig
		Crypto CryptoConfig
	}
	RepMsg struct {
		//请求返回的信息
		//http状态码
		Code int
		//返回的信息
		Msg string
	}

	AuthReq struct {
		RepMsg
		Authorization string
		Success       bool
		Menus         []DashboardMenu
	}

	Userinfo struct {
		RepMsg
		Username string
	}
	UserToken struct {
		//用户名
		Username string
		UpdateAt time.Time
		Role     int
		Device   string
		Token    string
	}
	CheckLogin struct {
		RepMsg
		IsLogin bool
	}
	DashboardMenuRes struct {
		Title    string `json:"title"`
		Path     string `json:"path"`
		Icon     string `json:"icon"`
		ParentID int    `json:"parentID"`
		Order    int    `json:"order"`
	}
	UserMessagesRes struct {
		Title       string `json:"title"`
		Description string `json:"description"`
		ID          uint   `json:"id"`
		Read        bool   `json:"read"`
	}
	LogsRes struct {
		Level       string    `json:"level"`
		Path        string    `json:"path"`
		Username    string    `json:"username"`
		IP          string    `json:"ip"`
		UA          string    `json:"ua"`
		Description string    `json:"description"`
		Time        time.Time `json:"time"`
	}
	SupplierRes struct {
		ID        uint      `json:"id"`
		Name      string    `json:"name"`
		Contacts  string    `json:"contacts"`
		Address   string    `json:"address"`
		Pinyin    string    `json:"pinyin"`
		Remarks   string    `json:"remarks"`
		CreatedAt time.Time `json:"createdAt"`
	}
	GoodsTypesRes struct {
		ID        uint      `json:"id"`
		Name      string    `json:"name"`
		Pinyin    string    `json:"pinyin"`
		Remarks   string    `json:"remarks"`
		CreatedAt time.Time `json:"createdAt"`
	}
	UnitRes struct {
		ID        uint      `json:"id"`
		Name      string    `json:"name"`
		Pinyin    string    `json:"pinyin"`
		Remarks   string    `json:"remarks"`
		CreatedAt time.Time `json:"createdAt"`
	}
	InventoryNameRes struct {
		ID                uint      `json:"id"`
		Name              string    `json:"name"`
		CostPrice         float64   `json:"costPrice"`
		CostPrices        []float64 `json:"costPrices"`
		SellingPrice      float64   `json:"sellingPrice"`
		GuidePrice        float64   `json:"guidePrice"`
		AverageCostPrice  float64   `json:"averageCostPrice"`
		MinPackages       int64     `json:"minPackages"`
		SupplierID        int       `json:"supplierID"`
		GoodsTypesID      int       `json:"goodsTypesID"`
		UnitID            int       `json:"unitID"`
		Inventory         int64     `json:"inventory"`
		UpdatedAt         time.Time `json:"updatedAt"`
		LatestStorageTime time.Time `json:"latestStorageTime"`
		LatestTime        string    `json:"latestTime"`
	}
	BatchAddInventory struct {
		Name           string      `json:"商品名称"`
		GoodsTypesName string      `json:"商品种类"`
		Code           string      `json:"商品ID"`
		SupplierName   string      `json:"供货商"`
		Inventory      int64       `json:"库存量"`
		CostPrice      json.Number `json:"成本价"`
		SellingPrice   json.Number `json:"销售价"`
		GuidePrice     json.Number `json:"指导价"`
		UnitName       string      `json:"单位"`
		MinPackages    int64       `json:"最小包装数"`
	}
)
