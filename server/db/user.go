package db

import (
	"fmt"
	"myModule/lib"
	"myModule/pool"
	"myModule/types"
	"time"
)

func SignUp(newUser types.User) types.RepMsg {
	//注册
	var req types.RepMsg

	if newUser.Username == "" {
		req = types.RepMsg{Code: 403, Msg: "用户名不能为空！"}
	} else if !lib.CommonlyTest.Username(newUser.Username) {
		req = types.RepMsg{Code: 403, Msg: "用户名不符合规则！"}
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

func SignIn(user types.User, device string) types.AuthReq {
	var req types.AuthReq
	//前台传来的密码
	req = types.AuthReq{RepMsg: types.RepMsg{Code: 403, Msg: "登录失败！"}, Authorization: ""}
	SignInPassword := user.Password
	findUser := DB.Where("username = ?", user.Username).First(&user)
	//查询后user变成了数据库中的数据
	if findUser.Error != nil {
		req = types.AuthReq{RepMsg: types.RepMsg{Code: 403, Msg: "用户不存在！"}, Authorization: ""}
	}
	_, pas := lib.EncryptionString(SignInPassword, user.Salt)
	if pas == user.Password {
		Authorization := pool.SetUserToken(user, device)
		req = types.AuthReq{RepMsg: types.RepMsg{Code: 200, Msg: "登录成功！"}, Authorization: Authorization}
	}
	return req
}

func GetUserInfo(Authorization string) types.Userinfo {
	userToken, success := pool.GetUserByToken(Authorization)
	fmt.Println(666, userToken, success)
	userinfo := types.Userinfo{}
	if success {
		userinfo.Code = 200
	} else {
		userinfo.Code = 403
		userinfo.Msg = "登录失效，请重新登录！"
	}
	return userinfo
}
