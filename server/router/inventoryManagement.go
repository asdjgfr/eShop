package router

import (
	"github.com/gin-gonic/gin"
	"github.com/shopspring/decimal"
	"myModule/db"
	"myModule/log"
	"net/http"
	"strconv"
	"strings"
)

//单位路由
func InitInventoryManagement(r *gin.RouterGroup) {
	addInventory(r)
	getInventoryByName(r)
}

func addInventory(r *gin.RouterGroup) {
	r.POST(Address["addInventory"], func(c *gin.Context) {
		code := http.StatusOK
		msg := "添加库存成功！"

		inventory, iErr := strconv.ParseInt(strings.Trim(c.Request.PostFormValue("inventory"), " "), 10, 64)
		minPackages, mErr := strconv.ParseInt(strings.Trim(c.Request.PostFormValue("minPackages"), " "), 10, 64)
		supplierID, suErr := strconv.Atoi(strings.Trim(c.Request.PostFormValue("supplier[id]"), " "))
		goodsTypesID, goErr := strconv.Atoi(strings.Trim(c.Request.PostFormValue("goodsTypes[id]"), " "))
		unitID, uErr := strconv.Atoi(strings.Trim(c.Request.PostFormValue("unit[id]"), " "))
		tmpC, cErr := decimal.NewFromString(strings.Trim(c.Request.PostFormValue("costPrice"), " "))
		tmpS, seErr := decimal.NewFromString(strings.Trim(c.Request.PostFormValue("sellingPrice"), " "))
		tmpG, guErr := decimal.NewFromString(strings.Trim(c.Request.PostFormValue("guidePrice"), " "))

		for _, e := range []error{iErr, mErr, suErr, goErr, uErr, cErr, seErr, guErr} {
			if e != nil {
				msg = "参数格式不正确：" + e.Error()
				code = http.StatusUnprocessableEntity
				break
			}
		}

		var err error
		if code == http.StatusOK {
			err = db.AddInventory(c.Request.PostFormValue("name[name]"), c.Request.PostFormValue("supplier[name]"), c.Request.PostFormValue("goodsTypes[name]"), c.Request.PostFormValue("unit[name]"), tmpC.Round(2).String(), tmpS.Round(2).String(), tmpG.Round(2).String(), inventory, minPackages, supplierID, goodsTypesID, unitID)
			if err != nil {
				code = http.StatusUnprocessableEntity
				msg = "添加库存失败：" + err.Error()
			}
		}
		log.Info(c, msg)
		c.JSON(200, gin.H{
			"code": code,
			"msg":  msg,
		})
	})
}

func getInventoryByName(r *gin.RouterGroup) {
	r.POST(Address["getInventoryByName"], func(c *gin.Context) {
		msg := "通过名称获取库存列表成功！"
		inventories, err := db.GetInventoryByName(c.Request.PostFormValue("query"))
		if err != nil {
			msg = "通过名称获取库存列表失败：" + err.Error()
		}
		log.Info(c, msg)
		c.JSON(200, gin.H{
			"code":        http.StatusOK,
			"msg":         msg,
			"inventories": inventories,
		})
	})
}
