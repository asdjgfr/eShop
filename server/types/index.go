package types

type (
	DbConfig struct {
		//数据库配置文件结构
		DbName   string
		User     string
		Password string
	}
	Config struct {
		//配置文件结构
		Db   DbConfig
		Port int
	}
)
