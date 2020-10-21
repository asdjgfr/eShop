package lib

import (
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"github.com/satori/go.uuid"
	"golang.org/x/crypto/argon2"
	"io/ioutil"
	"math/big"
	"time"
)

type V struct {
}

//公用扩展库
func LoadJSON() *V {
	//加载本地json文件
	return &V{}
}

func (v1 *V) LoadJSONFile(fileName string, v interface{}) {
	jsonFile, err := ioutil.ReadFile(fileName)

	if err != nil {
		fmt.Println("文件读取失败", err)
		return
	}
	err = json.Unmarshal(jsonFile, &v)

	if err != nil {
		fmt.Println("文件解析失败", err)
		return
	}
}

func LongTime() string {
	//格式化时间用的layout
	return "2006-01-02 15:04:05"
}
func ShortTime() string {
	//格式化时间用的layout
	return "2006-01-02"
}

/**
* s 需要加密的字符创
* outSalt 给定的盐值
 */
func EncryptionString(s string, outSalt ...string) (string, string) {
	salt := ""
	if len(outSalt) == 0 {
		//随机生成盐
		randNum, _ := rand.Int(rand.Reader, new(big.Int).SetInt64(int64(100)))
		salt = randNum.String()
	} else {
		salt = outSalt[0]
	}
	//加密字符串
	return salt, base64.StdEncoding.EncodeToString(argon2.IDKey([]byte(s), []byte(salt), 1, 64*1024, 4, 32))
}

func StringToTime(s string) time.Time {
	local, _ := time.LoadLocation("Local")
	theTime, _ := time.ParseInLocation("2006-01-02 15:04:05", s, local)
	return theTime
}

func GenerateUUID() string {
	u := uuid.NewV4()
	return u.String()
}
