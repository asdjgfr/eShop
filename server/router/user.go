package router

import (
	"github.com/gin-gonic/gin"
	"myModule/db"
	"myModule/lib"
	"myModule/log"
	"myModule/types"
	"strconv"
	"time"
)

//用户路由
func InitUserRouter(r *gin.RouterGroup) {
	signUp(r)
	signIn(r)
	signOut(r)
	GetUserInfo(r)
	CheckSignIn(r)
	GetUserMenus(r)
	GetUserMessages(r)
	GetMessageByID(r)
	GetUnReadMessagesCount(r)
}

//注册接口
func signUp(r *gin.RouterGroup) {
	//用户注册接口
	r.POST(Address["signUp"], func(c *gin.Context) {
		role, _ := strconv.Atoi(c.Request.PostFormValue("role"))
		res := db.SignUp(types.User{
			Username: c.Request.PostFormValue("username"),
			Password: c.Request.PostFormValue("password"),
			Phone:    c.Request.PostFormValue("phone"),
			Email:    c.Request.PostFormValue("email"),
			Role:     role,
			Birthday: lib.StringToTime(c.Request.PostFormValue("birthday") + " 00:00:00.000"),
		})
		log.Info(c, res.Msg)
		c.JSON(200, gin.H{
			"code": res.Code,
			"msg":  res.Msg,
		})
	})
}

//登录接口
func signIn(r *gin.RouterGroup) {
	r.POST(Address["signIn"], func(c *gin.Context) {

		res := db.SignIn(types.User{
			Username: c.Request.PostFormValue("username"),
			Password: c.Request.PostFormValue("password"),
		}, lib.GetDeviceType(c.Request.Header.Get("user-agent")))
		log.Info(c, res.Msg)
		c.JSON(200, gin.H{
			"code":          res.Code,
			"msg":           res.Msg,
			"Authorization": res.Authorization,
		})
	})
}

//注销登录
func signOut(r *gin.RouterGroup) {
	r.POST(Address["signOut"], func(c *gin.Context) {
		username, _ := c.Get("username")
		token, _ := c.Get("token")
		res := db.SignOut(token.(string), username.(string))
		log.Info(c, res.Msg)
		c.JSON(200, gin.H{
			"code": res.Code,
			"msg":  res.Msg,
		})
	})
}

//获取用户信息
func GetUserInfo(r *gin.RouterGroup) {
	//获取用户的信息
	r.POST(Address["getUserInfo"], func(c *gin.Context) {
		username, _ := c.Get("username")
		userInfo, err := db.GetUserInfo(username.(string))
		if err == nil {
			phone := ""
			if len(userInfo.Phone) == 0 {
				phone = "未绑定手机号"
			} else {
				phone = userInfo.Phone[:3] + "****" + userInfo.Phone[6:]
			}
			email := userInfo.Email
			if email == "" {
				email = "未绑定邮箱"
			}
			role := db.GetUserRole(userInfo.Role)
			log.Info(c, "获取用户信息成功！")
			c.JSON(200, gin.H{
				"code": 200,
				"msg":  "查询成功！",
				"userinfo": struct {
					Username string    `json:"username"`
					Email    string    `json:"email"`
					Phone    string    `json:"phone"`
					Role     string    `json:"role"`
					Birthday time.Time `json:"birthday"`
				}{
					Username: userInfo.Username,
					Email:    email,
					Phone:    phone,
					Role:     role,
					Birthday: userInfo.Birthday,
				},
			})
		} else {
			log.Info(c, "获取用户信息失败！")
			c.JSON(200, gin.H{
				"code": 406,
				"msg":  "获取用户信息失败！",
			})
		}
	})
}

//监测是否登录
func CheckSignIn(r *gin.RouterGroup) {
	r.POST(Address["checkSignIn"], func(c *gin.Context) {
		log.Info(c, "token有效！")
		c.JSON(200, gin.H{
			"code": 200,
			"msg":  "token有效！",
		})
	})
}

//获取用户的菜单
func GetUserMenus(r *gin.RouterGroup) {
	r.POST(Address["getUserMenus"], func(c *gin.Context) {
		username, _ := c.Get("username")
		userInfo, err := db.GetUserInfo(username.(string))
		userMenus, err := db.GetUserMenus(userInfo.Menus)

		if err == nil {
			log.Info(c, "获取用户菜单成功！")
			c.JSON(200, gin.H{
				"code":  200,
				"msg":   "获取用户菜单成功！",
				"menus": userMenus,
			})
		} else {
			log.Info(c, "获取用户菜单失败！")
			c.JSON(200, gin.H{
				"code": 406,
				"msg":  "获取用户菜单失败！",
			})
		}
	})
}

//获取用户的消息
func GetUserMessages(r *gin.RouterGroup) {
	r.POST(Address["getUserMessages"], func(c *gin.Context) {
		username, _ := c.Get("username")
		fePage := c.Request.PostFormValue("page")
		fePageSize := c.Request.PostFormValue("pageSize")
		page := 1
		pageSize := 20
		if fePage != "" {
			page, _ = strconv.Atoi(fePage)
		}
		if fePageSize != "" {
			pageSize, _ = strconv.Atoi(fePageSize)
		}

		messages, count, err := db.GetUserMessages(username.(string), pageSize, (page-1)*pageSize, c.Request.PostFormValue("getAll") == "true")

		if err == nil {
			log.Info(c, "获取用户通知成功！")
			c.JSON(200, gin.H{
				"code":     200,
				"msg":      "获取用户通知成功！",
				"messages": messages,
				"count":    count,
			})
		} else {
			log.Info(c, "获取用户通知失败！")
			c.JSON(200, gin.H{
				"code": 406,
				"msg":  "获取用户通知失败！",
			})
		}
	})
}

//获取消息详情
func GetMessageByID(r *gin.RouterGroup) {
	r.POST(Address["getMessageByID"], func(c *gin.Context) {
		message, err := db.GetMessageByID(c.Request.PostFormValue("id"))
		if err == nil {
			log.Info(c, "获取消息详情成功！")
			c.JSON(200, gin.H{
				"code":    200,
				"msg":     "获取消息详情成功！",
				"message": message,
			})
		} else {
			log.Info(c, "获取消息详情失败！")
			c.JSON(200, gin.H{
				"code": 406,
				"msg":  "获取消息详情失败！",
			})
		}
	})
}

//获取未读消息个数
func GetUnReadMessagesCount(r *gin.RouterGroup) {
	r.POST(Address["getUnReadMessagesCount"], func(c *gin.Context) {
		username, _ := c.Get("username")
		count := db.GetUnReadCount(username.(string))
		log.Info(c, "获取未读消息个数成功！")
		c.JSON(200, gin.H{
			"code":  200,
			"msg":   "获取未读消息个数成功！",
			"count": count,
		})
	})
}
