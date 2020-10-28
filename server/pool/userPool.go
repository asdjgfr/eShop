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

	userToken := types.UserToken{Username: user.Username, UpdateAt: time.Now(), Role: user.Role, Device: device}
	userTokenJson, _ := json.Marshal(userToken)
	//用户token72小时过期
	redis.Rdb.Set(redis.RdbCtx, redisKey, userTokenJson, time.Hour*72)
	return resToken
}

func GetUserByToken(encryptedString string) (types.UserToken, bool) {
	token, username, success := decodeTokenAndUsername(encryptedString)
	userToken := types.UserToken{}
	if !success {
		return userToken, success
	}
	fmt.Println(888, token, username)
	//findToken, err := redis.Rdb.Get(redis.RdbCtx, token).Result()

	//if err == goRedis.Nil {
	//	hasToken = false
	//}
	////反序列化
	//_ = json.Unmarshal([]byte(findToken), &userToken)
	return userToken, success
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
