package router

var Address = map[string]string{
	"getShopInfo": "/info/get-shop-info",
}

func InitRouterAddress() {
	//初始化路由地址
	//api下的地址，url前都会加上/api/
	apiAddress := map[string]string{
		"signIn":          "sign-in",
		"signUp":          "sign-up",
		"signOut":         "sign-out",
		"getUserInfo":     "get-user-info",
		"checkSignIn":     "check-sign-in",
		"getUserMenus":    "get-user-menus",
		"getUserMessages": "get-user-messages",
	}
	for k, v := range apiAddress {
		Address[k] = v
	}
}
