package db

import (
	"myModule/types"
)

func SaveLogger(log types.Logger) {
	DB.Create(&log)
}

func GetLogs(username string, limit, offset int) ([]types.LogsRes, string) {
	var logs []types.Logger
	var logsRes []types.LogsRes
	var user types.User
	errorMsg := ""
	dbFind := DB.Limit(limit).Offset(offset).Find(&logs)
	if dbFind.Error != nil {
		errorMsg = "获取日志失败，请联系管理员检查数据库！"
	}
	dbUser := DB.Find(&user)
	if dbUser.Error != nil {
		errorMsg = "用户查找失败，请联系管理员检查数据库！"
	}
	if user.Role != 1 {
		errorMsg = "用户无权查看日志！"
		return logsRes, errorMsg
	}
	for _, l := range logs {
		logsRes = append(logsRes, types.LogsRes{
			Level:       l.Level,
			Path:        l.Path,
			Username:    l.Username,
			IP:          l.IP,
			UA:          l.UA,
			Description: l.Description,
			Time:        l.CreatedAt,
		})
	}

	if len(logsRes) == 0 {
		logsRes = []types.LogsRes{}
	}
	return logsRes, errorMsg
}
