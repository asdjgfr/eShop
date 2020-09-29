package router

import (
	"github.com/gin-gonic/gin"
	"myModule/db"
)

func InitLoginRouter(r *gin.Engine) {
	//登录接口
	r.POST("/api/login", func(c *gin.Context) {
		db.CreateUser()
		c.JSON(200, gin.H{
			"message": "登陆",
		})
	})
}
