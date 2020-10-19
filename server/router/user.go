package router

import (
	"github.com/gin-gonic/gin"
	"myModule/db"
	"strconv"
	"time"
)

//用户路由
func InitLoginRouter(r *gin.Engine) {
	//登录接口
	signUp(r)
}

func signUp(r *gin.Engine) {
	//用户注册接口
	r.POST("/api/sign-up", func(c *gin.Context) {
		birthday, _ := strconv.Atoi(c.Request.PostFormValue("birthday"))
		role, _ := strconv.Atoi(c.Request.PostFormValue("role"))

		res := db.SignUp(db.User{
			UserName: c.Request.PostFormValue("username"),
			Password: c.Request.PostFormValue("password"),
			Phone:    c.Request.PostFormValue("phone"),
			Email:    c.Request.PostFormValue("email"),
			Role:     role,
			Birthday: time.Unix(int64(birthday/1000), 0),
		})
		c.JSON(200, gin.H{
			"code": res.Code,
			"msg":  res.Msg,
		})
	})
}
