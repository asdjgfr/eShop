package types

import (
	"gorm.io/gorm"
	"time"
)

//公用类型
type (
	DbConfig struct {
		//数据库配置文件结构
		DbName   string
		User     string
		Password string
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
	}
	CheckLogin struct {
		RepMsg
		IsLogin bool
	}
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
}
