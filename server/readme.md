`go version 1.15.2`
```json5
{
  "db": {
    //mysql数据库名称
    "dbName": "carv2",
    //mysql数据库用户名
    "user": "root",
    //mysql数据库密码
    "password": "Aa123456"
  },
  "redis": {
    //redis地址
    "addr": "localhost:6379",
    //redis密码
    "password": "",
    //0-15之中的某一个数据库
    "db": 0
  },
  "crypto": {
    //AES加密的密钥
    "AES": "Aa123456"
  },
  "port": 5001
}
```