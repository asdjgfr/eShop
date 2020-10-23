package router

var apiPrefix = "/api/"

var Address = map[string]string{}

func InitRouterAddress() {
	//初始化路由地址
	apiAddress := map[string]string{
		"signIn":      "sign-in",
		"signUp":      "sign-up",
		"getUserInfo": "get-user-info",
	}
	for k, v := range apiAddress {
		Address[k] = apiPrefix + v
	}
}
