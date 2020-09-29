package db

import (
	"gorm.io/gorm"
	"time"
)

type User struct {
	gorm.Model
	ID           uint `gorm:"->"`
	Name         string
	Email        *string
	Phone        *string
	Age          uint8
	Birthday     time.Time
}

func CreateUser()  {
	user := User{Name: "Jinzhu", Age: 18, Birthday: time.Now()}
	DB.Create(&user)
}
