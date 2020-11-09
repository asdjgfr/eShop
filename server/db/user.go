package db

import (
	"fmt"
	"github.com/mssola/user_agent"
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

func SignIn(user types.User, ua *user_agent.UserAgent) types.AuthReq {
	device := "unknown"
	if ua.Mobile() {
		fmt.Printf("%v\n", ua.Mozilla())  // => "5.0"
		fmt.Printf("%v\n", ua.Platform()) // => "X11"
		fmt.Printf("os%v\n", ua.OS())     // => "Linux x86_64"
	} else if ua.Platform() != "" && ua.OS() != "" {
		device = "pc"
	}

	var req types.AuthReq
	//前台传来的密码
	req = types.AuthReq{RepMsg: types.RepMsg{Code: 403, Msg: "登录失败！"}, Authorization: "", Success: false}
	SignInPassword := user.Password
	findUser := DB.Where("username = ?", user.Username).First(&user)
	//查询后user变成了数据库中的数据
	if findUser.Error != nil {
		req.Code = 403
		req.Msg = "用户不存在！"
		req.Success = false
		return req
	}
	_, pas := lib.EncryptionString(SignInPassword, user.Salt)
	if pas == user.Password {
		pool.RemoveToken(user.Username, device)
		req.Code = 200
		req.Msg = "登录成功！"
		req.Authorization = pool.SetUserToken(user, device)
		req.Success = true
		req.Menus = []types.DashboardMenu{}
	} else {
		req.Code = 403
		req.Msg = "密码错误，请检查后重试！"
	}
	return req
}

func GetUserInfo(username string) (types.User, error) {
	var findUser = types.User{}
	dbFind := DB.Where("username = ?", username).First(&findUser)
	err := dbFind.Error
	return findUser, err
}
