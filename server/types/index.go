package types

//公用类型
type (
	DbConfig struct {
		//数据库配置文件结构
		DbName   string
		User     string
		Password string
	}
	RedisConfig struct {
		//redis配置文件结构
		Addr     string
		Password string
		DB       int
	}
	Config struct {
		//配置文件结构
		Db    DbConfig
		Port  int
		Redis RedisConfig
	}
	RepMsg struct {
		//请求返回的信息
		//http状态码
		Code int
		//返回的信息
		Msg string
	}
	Token struct {
	}
)
