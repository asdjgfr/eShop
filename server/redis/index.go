package redis

import (
	"context"
	"fmt"
	"github.com/go-redis/redis/v8"
	"myModule/types"
)

var RdbCtx = context.Background()
var Rdb *redis.Client

func InitRedis(config types.RedisConfig) {
	Rdb = redis.NewClient(&redis.Options{
		Addr:     config.Addr,
		Password: config.Password, // no password set
		DB:       config.DB,       // use default DB
	})
	_, err := Rdb.Ping(RdbCtx).Result()
	if err != nil {
		fmt.Println("redis连接失败：", err.Error())
	} else {
		fmt.Println("redis连接成功！")
	}
}
