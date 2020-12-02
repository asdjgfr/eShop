package router

import (
	"github.com/gin-gonic/gin"
	"myModule/db"
	"myModule/log"
)

//单位路由
func InitUnitRouter(r *gin.RouterGroup) {
	getUnit(r)
}

func getUnit(r *gin.RouterGroup) {
	r.POST(Address["getUnit"], func(c *gin.Context) {
		unit, err := db.GetUnit(c.Request.PostFormValue("query"))
		log.Info(c, "获取单位")
		msg := "获取单位成功！"
		if err != nil {
			msg = err.Error()
		}
		c.JSON(200, gin.H{
			"code": 200,
			"msg":  msg,
			"unit": unit,
		})
	})
}
