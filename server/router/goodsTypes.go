package router

import (
	"github.com/gin-gonic/gin"
	"myModule/db"
	"myModule/log"
)

//供货商路由
func InitGoodsTypesRouter(r *gin.RouterGroup) {
	getGoodsTypes(r)
}

func getGoodsTypes(r *gin.RouterGroup) {
	r.POST(Address["getGoodsTypes"], func(c *gin.Context) {
		goodsTypes, err := db.GetGoodTypes(c.Request.PostFormValue("query"))
		log.Info(c, "获取商品类型")
		msg := "获取商品类型成功！"
		if err != nil {
			msg = err.Error()
		}
		c.JSON(200, gin.H{
			"code":       200,
			"msg":        msg,
			"goodsTypes": goodsTypes,
		})
	})
}
