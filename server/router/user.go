package router

import (
	"github.com/gin-gonic/gin"
	"myModule/db"
	"myModule/lib"
	"strconv"
)

//用户路由
func InitUserRouter(r *gin.Engine) {
	//注册接口
	signUp(r)
	//登录接口
	signIn(r)
}

func signUp(r *gin.Engine) {
	//用户注册接口
	r.POST("/api/sign-up", func(c *gin.Context) {
		role, _ := strconv.Atoi(c.Request.PostFormValue("role"))
		res := db.SignUp(db.User{
			UserName: c.Request.PostFormValue("username"),
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
		res := db.SignIn(db.User{
			UserName: c.Request.PostFormValue("username"),
			Password: c.Request.PostFormValue("password"),
		})
		c.JSON(200, gin.H{
			"code": res.Code,
			"msg":  res.Msg,
		})
	})
}
