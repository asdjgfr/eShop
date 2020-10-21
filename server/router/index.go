package router

import (
	"github.com/gin-gonic/gin"
)

//路由主文件
func InitRoutes(r *gin.Engine) {
	//初始化路由
	InitUserRouter(r)
}
