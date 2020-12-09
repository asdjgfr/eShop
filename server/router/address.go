package router

var Address = map[string]string{
	"getShopInfo": "/info/get-shop-info",
}

func InitRouterAddress() {
	//初始化路由地址
	//api下的地址，url前都会加上/api/
	apiAddress := map[string]string{
		"signIn":                 "sign-in",
		"signUp":                 "sign-up",
		"signOut":                "sign-out",
		"getUserInfo":            "get-user-info",
		"checkSignIn":            "check-sign-in",
		"getUserMenus":           "get-user-menus",
		"getUserMessages":        "get-user-messages",
		"getMessageByID":         "get-message-by-id",
		"getUnReadMessagesCount": "get-unread-messages-count",
		"getLogs":                "get-logs",
		"getSuppliers":           "get-suppliers",
		"getGoodsTypes":          "get-goods-types",
		"getUnit":                "get-unit",
		"addInventory":           "add-inventory",
		"getInventoryByName":     "get-inventory-by-name",
		"getInventoryList":       "get-inventory-list",
		"deleteInventoryByID":    "delete-inventory-by-id",
	}
	for k, v := range apiAddress {
		Address[k] = v
	}
}
