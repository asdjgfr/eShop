package lib

import (
	"regexp"
)

type commonlyTest struct {
}

//常用的验证
var CommonlyTest = commonlyTest{}

func (obj commonlyTest) Phone(s string) bool {
	//验证手机号
	return pubReg(s, "phone")
}
func (obj commonlyTest) Email(s string) bool {
	//验证手机号
	return pubReg(s, "email")
}

func pubReg(s string, regType string) bool {
	regs := make(map[string]string)

	regs["phone"] = "^1[3-9]\\d{9}$"
	regs["email"] = "^(([^<>()[\\]\\\\.,;:\\s@\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$"

	m, err := regexp.MatchString(regs[regType], s)
	if err != nil {
		m = false
	}
	return m
}
