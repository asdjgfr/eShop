package router

var Address = map[string]string{}

func InitRouterAddress() {
	//初始化路由地址
	//api下的地址，url前都会加上/api/
	apiAddress := map[string]string{
		"signIn":      "sign-in",
		"signUp":      "sign-up",
		"getUserInfo": "get-user-info",
	}
	for k, v := range apiAddress {
		Address[k] = v
	}
}
