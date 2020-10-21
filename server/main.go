package main

import (
	"github.com/gin-gonic/gin"
	"myModule/db"
	"myModule/lib"
	"myModule/redis"
	"myModule/router"
	"myModule/types"
	"strconv"
)

func main() {
	JsonParse := lib.LoadJSON()
	//加载配置文件
	config := types.Config{}
	//下面使用的是相对路径，config.json文件和main.go文件处于同一目录下
	JsonParse.LoadJSONFile("./config.json", &config)
	//初始化redis
	redis.InitRedis(config.Redis)
	//初始化数据库
	db.InitDB(config.Db)
	//初始化gin
	r := gin.Default()
	router.InitRoutes(r)
	_ = r.Run(":" + strconv.Itoa(config.Port))
}
