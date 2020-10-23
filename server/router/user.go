package router

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"myModule/config"
	"myModule/db"
	"myModule/lib"
	"myModule/redis"
	"myModule/types"
	"strconv"
	"strings"
)

//用户路由
func InitUserRouter(r *gin.Engine) {
	//注册接口
	signUp(r)
	//登录接口
	signIn(r)
	GetUserInfo(r)
}

func signUp(r *gin.Engine) {
	//用户注册接口
	r.POST("/api/sign-up", func(c *gin.Context) {
		role, _ := strconv.Atoi(c.Request.PostFormValue("role"))
		res := db.SignUp(types.User{
			Username: c.Request.PostFormValue("username"),
			Password: c.Request.PostFormValue("password"),
			Phone:    c.Request.PostFormValue("phone"),
			Email:    c.Request.PostFormValue("email"),
			Role:     role,
			Birthday: lib.StringToTime(c.Request.PostFormValue("birthday") + " 00:00:00.000"),
		})
		c.JSON(200, gin.H{
			"code": res.Code,
			"msg":  res.Msg,
		})
	})
}

func signIn(r *gin.Engine) {
	//用户注册接口
	r.POST(Address["signIn"], func(c *gin.Context) {
		res := db.SignIn(types.User{
			Username: c.Request.PostFormValue("username"),
			Password: c.Request.PostFormValue("password"),
		}, c.Request.PostFormValue("device"))

		c.JSON(200, gin.H{
			"code":          res.Code,
			"msg":           res.Msg,
			"Authorization": res.Authorization,
		})
	})
}

func GetUserInfo(r *gin.Engine) {
	//获取用户的信息
	r.POST(Address["getUserInfo"], func(c *gin.Context) {
		Authorization := c.Request.Header.Get("Authorization")
		loginRes, userToken := CheckLogin(Authorization)
		fmt.Print(loginRes, userToken)
		req := db.GetUserInfo(Authorization)
		c.JSON(200, gin.H{
			"code": req.Code,
			"msg":  req.Msg,
		})
	})
}

//检查是否登录成功

func CheckLogin(authorization string) (types.CheckLogin, types.UserToken) {
	var userToken types.UserToken
	globalConfig := config.GlobalConfig
	tokenAndUsername, success := lib.DecryptAES(authorization, globalConfig.Crypto.AES)
	tokenAndUsernameSplit := strings.Split(tokenAndUsername, "#")
	res := types.CheckLogin{
		RepMsg: types.RepMsg{
			Code: 200,
			Msg:  "已登录",
		},
		IsLogin: true,
	}
	if !success {
		//解码失败返回false
		res.Msg = "身份验证失败，请检查Authorization！"
		res.Code = 401
		res.IsLogin = success
		return res, userToken
	}
	if len(tokenAndUsernameSplit) != 2 {
		//参数错误
		res.Msg = "参数错误，请重新登录！"
		res.Code = 401
		res.IsLogin = false
		return res, userToken
	}
	token := tokenAndUsernameSplit[0]
	username := tokenAndUsernameSplit[1]
	rdbT := redis.Rdb.Get(redis.RdbCtx, token+"#"+username)
	if rdbT.Err() != nil {
		res.Msg = "登录失效，请重新登录！"
		res.Code = 401
		res.IsLogin = success
		return res, userToken
	}

	rdbTResult, _ := rdbT.Result()
	//反序列化
	_ = json.Unmarshal([]byte(rdbTResult), &userToken)
	return res, userToken
}
