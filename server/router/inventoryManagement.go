package router

import (
	"fmt"
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
	getInventoryList(r)
	deleteInventoryByID(r)
	batchAddInventory(r)
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

		for _, eMap := range []map[string]interface{}{
			{"msg": "库存量格式错误", "err": iErr},
			{"msg": "最小包装数格式错误", "err": mErr},
			{"msg": "供货商ID格式错误", "err": suErr},
			{"msg": "商品类型ID格式错误", "err": goErr},
			{"msg": "单位ID格式错误", "err": uErr},
			{"msg": "成本价格式错误", "err": cErr},
			{"msg": "销售价格式错误", "err": seErr},
			{"msg": "指导价格式错误", "err": guErr},
		} {
			if eMap["err"] != nil {
				msg = eMap["msg"].(string) + "：" + eMap["err"].(error).Error()
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

func getInventoryList(r *gin.RouterGroup) {
	r.POST(Address["getInventoryList"], func(c *gin.Context) {
		msg := "获取库存列表成功！"
		fePage := c.Request.PostFormValue("page")
		fePageSize := c.Request.PostFormValue("pageSize")
		page := 1
		pageSize := 10
		if fePage != "" {
			page, _ = strconv.Atoi(fePage)
		}
		if fePageSize != "" {
			pageSize, _ = strconv.Atoi(fePageSize)
		}
		inventories, total, err := db.GetInventoryList(pageSize, (page-1)*pageSize)
		if err != nil {
			msg = "获取库存列表失败：" + err.Error()
		}
		log.Info(c, msg)
		c.JSON(200, gin.H{
			"code":        http.StatusOK,
			"msg":         msg,
			"inventories": inventories,
			"total":       total,
		})
	})
}

func deleteInventoryByID(r *gin.RouterGroup) {
	r.POST(Address["deleteInventoryByID"], func(c *gin.Context) {
		msg := "删除库存成功！"
		id := c.Request.PostFormValue("id")
		idInt, _ := strconv.Atoi(id)
		err := db.DeleteInventoryByID(idInt)
		if err != nil {
			msg = "删除库存失败：" + err.Error()
		}
		log.Info(c, msg)
		c.JSON(200, gin.H{
			"code": http.StatusOK,
			"msg":  msg,
		})
	})
}

func batchAddInventory(r *gin.RouterGroup) {
	r.POST(Address["batchAddInventory"], func(c *gin.Context) {
		var json []map[string]string
		c.ShouldBindJSON(&json)
		fmt.Println(json[0]["列1"])
		c.JSON(200, gin.H{
			"code": 200,
			"msg":  c.Request.PostFormValue("data"),
		})
	})
}
