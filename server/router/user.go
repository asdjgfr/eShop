package router

import (
	"github.com/gin-gonic/gin"
	"myModule/db"
	"myModule/lib"
	"strconv"
)

//用户路由
func InitLoginRouter(r *gin.Engine) {
	//登录接口
	signUp(r)
}

func signUp(r *gin.Engine) {
	//用户注册接口
	r.POST("/api/sign-up", func(c *gin.Context) {
		role, _ := strconv.Atoi(c.Request.PostFormValue("role"))
		salt, pas := lib.EncryptionString(c.Request.PostFormValue("password"))
		res := db.SignUp(db.User{
			UserName: c.Request.PostFormValue("username"),
			Password: pas,
			Phone:    c.Request.PostFormValue("phone"),
			Email:    c.Request.PostFormValue("email"),
			Role:     role,
			Birthday: lib.StringToTime(c.Request.PostFormValue("birthday") + " 00:00:00.000"),
			Salt:     salt,
		})
		c.JSON(200, gin.H{
			"code": res.Code,
			"msg":  res.Msg,
		})
	})
}
