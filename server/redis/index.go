package redis

import (
	"context"
	"fmt"
	"github.com/go-redis/redis/v8"
	"myModule/types"
	"strconv"
	"time"
)

var RdbCtx = context.Background()
var Rdb *redis.Client

var timer *time.Timer
var count = 1

func InitRedis(config types.RedisConfig, done chan bool) {
	fmt.Println("开始连接redis，请稍后...")
	fmt.Println("尝试连接第" + strconv.Itoa(count) + "次")

	go func() {
		Rdb = redis.NewClient(&redis.Options{
			Addr:     config.Addr,
			Password: config.Password, // no password set
			DB:       config.DB,       // use default DB
		})
		_, err := Rdb.Ping(RdbCtx).Result()
		if err != nil {
			count = count + 1
			if timer != nil {
				defer timer.Stop()
			}
			timer = time.AfterFunc(time.Duration(5)*time.Second, func() {
				InitRedis(config, done)
			})
			fmt.Println("redis连接失败，5秒后重连：", err.Error())
		} else {
			fmt.Println("redis连接成功！")
			done <- true
		}
	}()
}
