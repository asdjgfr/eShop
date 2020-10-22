package lib

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"io"
	"log"
)

func EncryptAES(stringToEncrypt string, keyString string) string {
	//Since the key is in string, we need to convert decode it to bytes
	key, _ := hex.DecodeString(keyString)
	plaintext := []byte(stringToEncrypt)

	//Create a new Cipher Block from the key
	block, err := aes.NewCipher(key)
	if err != nil {
		panic(err.Error())
	}

	//Create a new GCM - https://en.wikipedia.org/wiki/Galois/Counter_Mode
	//https://golang.org/pkg/crypto/cipher/#NewGCM
	aesGCM, err := cipher.NewGCM(block)
	if err != nil {
		panic(err.Error())
	}

	//Create a nonce. Nonce should be from GCM
	nonce := make([]byte, aesGCM.NonceSize())
	if _, err = io.ReadFull(rand.Reader, nonce); err != nil {
		panic(err.Error())
	}

	//Encrypt the data using aesGCM.Seal
	//Since we don't want to save the nonce somewhere else in this case, we add it as a prefix to the encrypted data. The first nonce argument in Seal is the prefix.
	ciphertext := aesGCM.Seal(nonce, nonce, plaintext, nil)
	return fmt.Sprintf("%x", ciphertext)
}

func DecryptAES(encryptedString string, keyString string) (string, bool) {
	//是否解析成功
	success := true
	key, err := hex.DecodeString(keyString)
	enc, err := hex.DecodeString(encryptedString)
	//Create a new Cipher Block from the key
	block, err := aes.NewCipher(key)
	if err != nil {
		success = false
		log.Println("创建Cipher失败：", err.Error())
	}
	//Create a new GCM
	aesGCM, err := cipher.NewGCM(block)
	if err != nil {
		success = false
		log.Println("创建GCM失败：", err.Error())
	}
	//Get the nonce size
	nonceSize := aesGCM.NonceSize()
	//Extract the nonce from the encrypted data
	nonce, ciphertext := enc[:nonceSize], enc[nonceSize:]
	//Decrypt the data
	plaintext, err := aesGCM.Open(nil, nonce, ciphertext, nil)
	if err != nil {
		success = false
		log.Println("aesGCM解析失败：", err.Error())
	}
	return fmt.Sprintf("%s", plaintext), success
}
