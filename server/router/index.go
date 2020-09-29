package router
import (
	"github.com/gin-gonic/gin"
)

func InitRoutes(r *gin.Engine) {
	//初始化路由
	InitLoginRouter(r)
}
