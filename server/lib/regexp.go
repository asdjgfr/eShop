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
func (obj commonlyTest) Password(s string) bool {
	//验证密码
	return pubReg(s, "password")
}

func pubReg(s string, regType string) bool {
	regs := make(map[string]string)

	//手机号校验，只要是13,14,15,16,17,18,19开头即可
	regs["phone"] = "^(?:(?:\\+|00)86)?1[3-9]\\d{9}$"
	//邮箱
	regs["email"] = "^(([^<>()[\\]\\\\.,;:\\s@\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$"
	if regType == "password" {
		return passwordValid(s)
	}
	m, err := regexp.MatchString(regs[regType], s)
	if err != nil {
		m = false
	}
	return m
}

func passwordValid(password string) bool {
	//由于golang的正则不支持Perl的?=方式，所以需要自己验证
	//最少8位，最多16位，包括至少1个大写字母，1个小写字母，1个数字，不可以包含除英文和数字以外的
	pasLen := len(password) > 7 && len(password) < 17

	hasUpperCase, _ := regexp.MatchString("[A-Z]", password)
	hasLowerCase, _ := regexp.MatchString("[a-z]", password)
	hasNumbers, _ := regexp.MatchString("[\\d]", password)
	hasSymbol, _ := regexp.MatchString("[^A-Za-z0-9]", password)

	return pasLen && hasUpperCase && hasLowerCase && hasNumbers && !hasSymbol
}
