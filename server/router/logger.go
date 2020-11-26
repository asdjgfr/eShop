package router

import (
	"github.com/gin-gonic/gin"
	"myModule/db"
	"strconv"
)

func InitLoggerRouter(r *gin.RouterGroup) {
	getLog(r)
}

func getLog(r *gin.RouterGroup) {
	r.POST(Address["getLogs"], func(c *gin.Context) {
		username, _ := c.Get("username")
		fePage := c.Request.PostFormValue("page")
		fePageSize := c.Request.PostFormValue("pageSize")
		page := 1
		pageSize := 20
		if fePage != "" {
			page, _ = strconv.Atoi(fePage)
		}
		if fePageSize != "" {
			pageSize, _ = strconv.Atoi(fePageSize)
		}
		logs, errMsg := db.GetLogs(username.(string), pageSize, (page-1)*pageSize)

		c.JSON(200, gin.H{
			"code": 200,
			"msg":  errMsg,
			"logs": logs,
		})
	})
}
