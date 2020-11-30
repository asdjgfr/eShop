package log

import (
	"github.com/gin-gonic/gin"
	"myModule/db"
	"myModule/types"
)

var excludePath = map[string]bool{"/api/get-logs": true}
var actions = map[string]string{
	"/info/get-shop-info":            "获取商铺信息",
	"/api/sign-in":                   "登录系统",
	"/api/sign-up":                   "注册",
	"/api/sign-out":                  "注销登录系统",
	"/api/get-user-info":             "获取用户信息",
	"/api/check-sign-in":             "检查登录状态",
	"/api/get-user-menus":            "获取用户的菜单",
	"/api/get-user-messages":         "获取用户通知",
	"/api/get-message-by-id":         "通过id获取一条通知详情",
	"/api/get-unread-messages-count": "获取未读消息的条数",
}

func LoggerMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		//请求处理
		c.Next()
		Info(c, "")
	}
}

func Info(c *gin.Context, description string) {
	path := c.Request.URL.String()
	username, err := c.Get("username")
	ip := c.ClientIP()
	ua := c.Request.Header.Get("user-agent")
	if err {
		username = username.(string)
	} else {
		username = ""
	}
	SaveLog("info", path, username.(string), ip, ua, description)
}

func Warn(c *gin.Context, description string) {
	path := c.Request.URL.String()
	username, err := c.Get("username")
	ip := c.ClientIP()
	ua := c.Request.Header.Get("user-agent")
	if err {
		username = username.(string)
	} else {
		username = ""
	}
	SaveLog("warn", path, username.(string), ip, ua, description)
}

func SaveLog(level, path, username, IP, ua, description string) {
	if !excludePath[path] {
		if IP == "" {
			IP = "0.0.0.0"
		}
		if username == "" {
			username = "未知用户"
		}
		if description == "" {
			description = actions[path]
		}
		db.SaveLogger(types.Logger{
			Level:       level,
			Path:        path,
			Username:    username,
			IP:          IP,
			UA:          ua,
			Description: description,
		})
	}
}
