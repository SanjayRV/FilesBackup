// package main

// import (
// 	"fmt"

// 	"golang.org/x/crypto/bcrypt"
// )

// func HashPassword(password string) (string, error) {
// 	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
// 	return string(bytes), err
// }

// func CheckPasswordHash(password, hash string) bool {
// 	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
// 	return err == nil
// }

// func main() {
// 	password := "sanjay"
// 	hash, _ := HashPassword(password) // ignore error for the sake of simplicity

// 	fmt.Println("Password:", password)
// 	fmt.Println("Hash:    ", hash)

// 	match := CheckPasswordHash(password, hash)
// 	fmt.Println("Match:   ", match)
// }

package main

// import (
// 	"fmt"

// 	"golang.org/x/crypto/bcrypt"
// )

// func main() {
// 	password := []byte("Sanjay")

// 	hashedPassword, err := bcrypt.GenerateFromPassword(password, bcrypt.DefaultCost)
// 	if err != nil {
// 		panic(err)
// 	}
// 	fmt.Println(string(hashedPassword))

// 	// Comparing the password with the hash
// 	err = bcrypt.CompareHashAndPassword(hashedPassword, password)
// 	fmt.Println(err) // nil means it is a match
// }
