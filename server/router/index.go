package router

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"myModule/config"
	"myModule/lib"
	"myModule/redis"
	"myModule/types"
	"strings"
)

var excludeUrl = map[string]bool{
	"/api/sign-in": true,
}

//路由主文件
func InitRoutes(r *gin.Engine) {
	//初始化不需要验证的通用路由
}

func InitAPIRoutes(r *gin.RouterGroup) {
	//初始化api下面的路由
	InitUserRouter(r)
}

func VerifyPermissions() gin.HandlerFunc {
	//权限验证中间件
	return func(context *gin.Context) {
		if excludeUrl[context.Request.URL.Path] {
			fmt.Print("中间件启用", context.Request.URL.Path, excludeUrl)
		} else {
			Authorization := context.Request.Header.Get("Authorization")
			loginRes, userToken := CheckLogin(Authorization)
			fmt.Print("验证loginRes", loginRes)
			fmt.Print("验证userToken", userToken)
			if loginRes.IsLogin {
				context.Set("username", userToken.Username)
			} else {
				context.JSON(200, gin.H{
					"code": loginRes.Code,
					"msg":  loginRes.Msg,
				})
				context.Abort()
			}
		}
	}
}

//检查是否登录成功
func CheckLogin(authorization string) (types.CheckLogin, types.UserToken) {
	var userToken types.UserToken
	globalConfig := config.GlobalConfig
	tokenAndUsername, success := lib.DecryptAES(authorization, globalConfig.Crypto.AES)
	tokenAndUsernameSplit := strings.Split(tokenAndUsername, "#")
	res := types.CheckLogin{
		RepMsg: types.RepMsg{
			Code: 501,
			Msg:  "未知错误！",
		},
		IsLogin: false,
	}
	if !success {
		//解码失败返回false
		res.Msg = "身份验证失败，请重新登录！"
		res.Code = 401
		res.IsLogin = success
		return res, userToken
	}
	if len(tokenAndUsernameSplit) != 3 {
		//参数错误
		res.Msg = "参数错误，请重新登录！"
		res.Code = 401
		res.IsLogin = false
		return res, userToken
	}
	token := tokenAndUsernameSplit[0]
	username := tokenAndUsernameSplit[1]
	device := tokenAndUsernameSplit[2]
	rdbT := redis.Rdb.Get(redis.RdbCtx, token+"#"+username+"#"+device)
	if rdbT.Err() != nil {
		res.Msg = "登录失效，请重新登录！"
		res.Code = 401
		res.IsLogin = false
		return res, userToken
	}

	rdbTResult, _ := rdbT.Result()
	//反序列化json
	_ = json.Unmarshal([]byte(rdbTResult), &userToken)
	res.Msg = "已登录！"
	res.Code = 200
	res.IsLogin = true
	return res, userToken
}
