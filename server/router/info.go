package router

import (
	"github.com/gin-gonic/gin"
	"myModule/db"
	"myModule/log"
	"myModule/types"
)

func InitInfoRouter(r *gin.Engine) {
	//获取店铺信息
	getShopInfo(r)
}

func getShopInfo(r *gin.Engine) {
	r.POST(Address["getShopInfo"], func(c *gin.Context) {
		var shopInfo types.ShopInfo
		res := db.DB.First(&shopInfo)
		if res.Error != nil {
			log.Info(c, "获取店铺信息失败！")
			c.JSON(200, gin.H{
				"code": 406,
				"msg":  "获取店铺信息失败！",
			})
		} else {
			log.Info(c, "获取店铺信息成功！")
			c.JSON(200, gin.H{
				"code": 200,
				"msg":  "获取店铺信息成功！",
				"data": map[string]string{
					"name":         shopInfo.Name,
					"introduction": shopInfo.Introduction,
					"suffix":       shopInfo.Suffix,
					"phones":       shopInfo.Phones,
					"Email":        shopInfo.Email,
				},
			})
		}
	})
}
