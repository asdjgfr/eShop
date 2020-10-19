package lib

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
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
