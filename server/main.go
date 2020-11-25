package main

import (
	"github.com/gin-gonic/gin"
	"myModule/config"
	"myModule/db"
	"myModule/log"
	"myModule/redis"
	"myModule/router"
	"strconv"
)

func main() {
	config.InitGlobalConfig()
	globalConfig := config.GlobalConfig
	//初始化redis
	done := make(chan bool)
	redis.InitRedis(globalConfig.Redis, done)
	<-done
	//初始化数据库
	db.InitDB(globalConfig.Db)
	//初始化gin
	r := gin.Default()
	//初始化路由地址
	router.InitRouterAddress()
	//所有api下面的都需要走中间件
	apiGroup := r.Group("/api")
	//挂载中间件
	apiGroup.Use(router.VerifyPermissions())
	r.Use(log.LoggerMiddleware())
	router.InitAPIRoutes(apiGroup)
	router.InitRoutes(r)
	_ = r.Run(":" + strconv.Itoa(globalConfig.Port))
}
