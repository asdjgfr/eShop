package lib

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
)

type V struct {
}

func LoadJSON() *V {
	return &V{}
}

func (v1 *V) LoadJSONFile(fileName string, v interface{}) {
	jsonFile, err := ioutil.ReadFile(fileName)

	if err != nil {
		fmt.Println("文件读取失败", err)
		return
	}
	fmt.Println("文件读取成功")
	err = json.Unmarshal(jsonFile, &v)

	if err != nil {
		fmt.Println("文件解析失败", err)
		return
	}
}

