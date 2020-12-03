package router

import (
	"github.com/gin-gonic/gin"
	"myModule/db"
	"myModule/log"
	"net/http"
)

//供货商路由
func InitSupplierRouter(r *gin.RouterGroup) {
	getSupplier(r)
}

func getSupplier(r *gin.RouterGroup) {
	r.POST(Address["getSuppliers"], func(c *gin.Context) {
		supplies, err := db.GetSupplier(c.Request.PostFormValue("query"))
		log.Info(c, "获取供货商")
		msg := "获取供货商成功！"
		if err != nil {
			msg = err.Error()
		}
		c.JSON(200, gin.H{
			"code":     http.StatusOK,
			"msg":      msg,
			"supplies": supplies,
		})
	})
}
