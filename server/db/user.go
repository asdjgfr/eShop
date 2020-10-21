package db

import (
	"fmt"
	"gorm.io/gorm"
	"myModule/lib"
	"myModule/types"
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
}

func SignUp(newUser User) types.RepMsg {
	//注册
	var req types.RepMsg

	if newUser.Username == "" {
		req = types.RepMsg{Code: 403, Msg: "用户名不能为空！"}
	} else if DB.Where("username = ?", newUser.Username).First(&newUser).Error == nil {
		req = types.RepMsg{Code: 403, Msg: "用户名已存在！"}
	} else if newUser.Password == "" {
		req = types.RepMsg{Code: 403, Msg: "密码不能为空！"}
	} else if !lib.CommonlyTest.Password(newUser.Password) {
		req = types.RepMsg{Code: 403, Msg: "密码不符合规则！"}
	} else if newUser.Email == "" {
		req = types.RepMsg{Code: 403, Msg: "邮箱不能为空！"}
	} else if !lib.CommonlyTest.Email(newUser.Email) {
		req = types.RepMsg{Code: 403, Msg: "邮箱格式不正确！"}
	} else if DB.Where("email = ?", newUser.Email).First(&newUser).Error == nil {
		req = types.RepMsg{Code: 403, Msg: "邮箱已被注册！"}
	} else if newUser.Phone == "" {
		req = types.RepMsg{Code: 403, Msg: "手机号不能为空！"}
	} else if !lib.CommonlyTest.Phone(newUser.Phone) {
		req = types.RepMsg{Code: 403, Msg: "手机号格式不正确！"}
	} else if DB.Where("phone = ?", newUser.Phone).First(&newUser).Error == nil {
		req = types.RepMsg{Code: 403, Msg: "手机号已被注册！"}
	} else if newUser.Birthday.After(time.Now()) {
		req = types.RepMsg{Code: 403, Msg: "生日不能是未来！"}
	} else {
		salt, pas := lib.EncryptionString(newUser.Password)
		newUser.Password = pas
		newUser.Salt = salt
		res := DB.Create(&newUser)
		if res.Error != nil {
			req = types.RepMsg{Code: 500, Msg: "数据库写入错误！" + res.Error.Error()}

		} else {
			req = types.RepMsg{Code: 200, Msg: "注册成功！"}

		}
	}
	return req
}

func SignIn(user User) types.RepMsg {
	var req types.RepMsg
	req = types.RepMsg{Code: 200, Msg: "登录成功！"}
	findUser := DB.Where("username = ?", user.Username).First(&user)

	if findUser.Error != nil {
		req = types.RepMsg{Code: 403, Msg: "用户名不存在！"}
	}
	fmt.Println(findUser)
	return req
}
