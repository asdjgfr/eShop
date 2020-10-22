package config

import (
	"crypto/rand"
	"encoding/hex"
	"myModule/lib"
	"myModule/types"
)

var GlobalConfig types.Config

func InitGlobalConfig() {
	var JsonParse = lib.LoadJSON()
	//下面使用的是相对路径，config.json文件和main.go文件处于同一目录下
	JsonParse.LoadJSONFile("./config.json", &GlobalConfig)

	//生成用于AES-256加密的随机32位密钥
	bytes := make([]byte, 32)
	if _, err := rand.Read(bytes); err != nil {
		panic(err.Error())
	}
	key := hex.EncodeToString(bytes)
	GlobalConfig.Crypto.AES = key
}
