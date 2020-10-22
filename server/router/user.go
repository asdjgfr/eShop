package router

import (
	"github.com/gin-gonic/gin"
	"myModule/db"
	"myModule/lib"
	"myModule/types"
	"strconv"
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
	r.POST("/api/sign-in", func(c *gin.Context) {
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
	r.POST("/api/get-user-info", func(c *gin.Context) {
		Authorization := c.Request.Header.Get("Authorization")
		req := db.GetUserInfo(Authorization)
		c.JSON(200, gin.H{
			"code": req.Code,
			"msg":  req.Msg,
		})
	})
}
