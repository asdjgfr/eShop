package pool

import (
	"encoding/json"
	"fmt"
	"myModule/config"
	"myModule/lib"
	"myModule/redis"
	"myModule/types"
	"strings"
	"time"
)

func SetUserToken(user types.User, device string) string {
	//设置用户登录时的token
	token := lib.GenerateUUID()
	globalConfig := config.GlobalConfig
	redisKey := token + "#" + user.Username + "#" + device
	resToken := lib.EncryptAES(redisKey, globalConfig.Crypto.AES)

	userToken := types.UserToken{
		Username: user.Username,
		UpdateAt: time.Now(),
		Role:     user.Role,
		Device:   device,
		Token:    token,
	}
	userTokenJson, _ := json.Marshal(userToken)
	//用户token72小时过期
	redis.Rdb.Set(redis.RdbCtx, redisKey, userTokenJson, time.Hour*72)
	return resToken
}

func RemoveToken(token, username, device string) error {
	var err error

	if token == "" {
		token = "*"
	}
	if username == "" {
		username = "*"
	}
	if device == "" {
		device = "*"
	}
	fmt.Println(token + "#" + username + "#" + device)
	iter := redis.Rdb.Scan(redis.RdbCtx, 0, token+"#"+username+"#"+device, 0).Iterator()
	for iter.Next(redis.RdbCtx) {
		err = redis.Rdb.Del(redis.RdbCtx, iter.Val()).Err()
		if err != nil {
			fmt.Println("删除旧的token失败：", err)
		}
	}
	if err = iter.Err(); err != nil {
		fmt.Println("查找旧token失败：", err)
	}
	return err
}

func decodeTokenAndUsername(encryptedString string) (string, string, bool) {
	//从加密的token中解析出token和用户名
	globalConfig := config.GlobalConfig
	tokenAndUsername, success := lib.DecryptAES(encryptedString, globalConfig.Crypto.AES)
	tokenAndUsernameSplit := strings.Split(tokenAndUsername, "#")
	token := ""
	username := ""
	if len(tokenAndUsernameSplit) == 2 {
		token = tokenAndUsernameSplit[0]
		username = tokenAndUsernameSplit[1]
	}

	return token, username, success
}
