package types

import (
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
		Remarks   string    `json:"remarks"`
		CreatedAt time.Time `json:"createdAt"`
	}
)
