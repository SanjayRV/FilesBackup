package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
)

func createUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	dbQuery, err := database.Prepare("INSERT INTO users (username, password, originalpassword, email, subscription_plan, " +
		"subscription_from, subscription_to) VALUES(?,?,?,?,?,?,?)")
	if err != nil {
		log.Fatal(err.Error())
	}

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Fatal(err.Error())
	}

	keyVal := make(map[string]string)
	json.Unmarshal(body, &keyVal)
	username := keyVal["username"]
	originalpassword := keyVal["password"]
	password := hashpassword(originalpassword)
	email := keyVal["email"]
	subscription_plan := keyVal["subscription_plan"]
	subscription_from := time.Now()
	subscription_to := time.Now().AddDate(0, 1, 0)

	checkQuery, err1 := database.Query("SELECT * FROM users where email=?", email)
	if err1 != nil {
		log.Fatal(err1.Error())
	}

	if !checkQuery.Next() {
		_, err2 := dbQuery.Exec(username, password, originalpassword, email, subscription_plan, subscription_from, subscription_to)
		if err2 != nil {
			log.Fatal(err2.Error())
		} else {
			var res jsonResponse
			msg1 := "User Created"
			res.Message = msg1
			res.Email = email
			json.NewEncoder(w).Encode(res)
		}
	} else {
		var res jsonResponse
		msg1 := "email already taken"
		res.Message = msg1
		json.NewEncoder(w).Encode(res)
	}

}

func login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	body, err1 := ioutil.ReadAll(r.Body)

	if err1 != nil {
		log.Fatal(err1.Error())
	}

	keyVal := make(map[string]string)
	json.Unmarshal(body, &keyVal)
	email := keyVal["email"]
	password := keyVal["password"]
	pass, err := database.Query("SELECT password FROM users WHERE email=?", email)
	if err != nil {
		log.Fatal(err.Error())
	}

	defer pass.Close()

	var enteredPassword string
	for pass.Next() {
		var user User
		err := pass.Scan(&user.Password)
		if err != nil {
			log.Fatal(err.Error())
		}

		enteredPassword = string(user.Password)
	}
	passCorrect := comparePasswords(enteredPassword, password)
	if passCorrect {
		validToken, err := GenerateJWT(email)
		if err != nil {
			fmt.Fprintf(w, err.Error())
		}

		var res jsonResponse
		msg1 := validToken
		user := email
		res.Message = msg1
		res.Email = user
		json.NewEncoder(w).Encode(res)
	} else {
		var res jsonResponse
		msg1 := "Login Failed"
		res.Message = msg1
		json.NewEncoder(w).Encode(res)
	}
}

func createFile(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	dbQuery, err := database.Prepare("INSERT INTO files (file_id, filename, device_id, device_name, file_size, file_version) VALUES(?,?,?,?,?,?)")
	if err != nil {
		log.Fatal(err.Error())
	}

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Fatal(err.Error())
	}

	keyVal := make(map[string]string)
	json.Unmarshal(body, &keyVal)
	file_id := keyVal["file_id"]
	filename := keyVal["filename"]
	device_id := keyVal["device_id"]
	deviceName := keyVal["device_name"]
	file_size := keyVal["file_size"]
	fileversion := keyVal["fileversion"]

	create, err1 := database.Query("SELECT * FROM files where filename=?", filename)
	if err1 != nil {
		log.Fatal(err1.Error())
	}

	if !create.Next() {
		_, err2 := dbQuery.Exec(file_id, filename, device_id, deviceName, file_size, fileversion)
		if err2 != nil {
			log.Fatal(err2.Error())
		} else {
			var res jsonResponse
			msg1 := "File Created"
			res.Message = msg1
			json.NewEncoder(w).Encode(res)
		}
	} else {
		var res jsonResponse
		msg1 := "Filename Exists"
		res.Message = msg1
		json.NewEncoder(w).Encode(res)
	}

}

func createFile2(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	file, handler, err := r.FormFile("file")
	if err != nil {
		log.Fatal(err.Error())
	}
	defer file.Close()
	//email := r.FormValue("email")
	filename := handler.Filename
	filesize := handler.Size

	dqQuery, err2 := database.Prepare("INSERT INTO filetrial (filename, filesize) VALUES (?,?)")
	if err2 != nil {
		log.Fatal(err.Error())
	}
	_, err3 := dqQuery.Exec(filename, filesize)
	if err3 != nil {
		log.Fatal(err.Error())
	}
}

func fileToTrash(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Fatal(err.Error())
	}

	keyVal := make(map[string]string)
	json.Unmarshal(body, &keyVal)
	filename := keyVal["filename"]

	check, err1 := database.Query("SELECT * FROM files where filename=?", filename)
	if err1 != nil {
		log.Fatal(err1.Error())
	}

	defer check.Close()

	for check.Next() {
		var move Files
		err := check.Scan(&move.FileId, &move.Filename, &move.DeviceId, &move.DeviceName, &move.Filesize, &move.FileVersion)
		if err != nil {
			log.Fatal(err.Error())
		}
		dbQuery, err := database.Prepare("INSERT INTO bin (file_id, filename, device_id, device_name, filesize, file_version) VALUES(?,?,?,?,?,?)")
		if err != nil {
			log.Fatal(err.Error())
		}

		_, err = ioutil.ReadAll(r.Body)
		if err != nil {
			log.Fatal(err.Error())
		}

		_, err1 := dbQuery.Exec(&move.FileId, &move.Filename, &move.DeviceId, &move.DeviceName, &move.Filesize, &move.FileVersion)
		if err1 != nil {
			log.Fatal(err1.Error())
		}
		_, err = database.Query("DELETE FROM files where filename=?", filename)
		if err != nil {
			log.Fatal(err.Error())
		}
		fmt.Fprint(w, "Moved to trash")
	}
}

func restore(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Fatal(err.Error())
	}

	keyVal := make(map[string]string)
	json.Unmarshal(body, &keyVal)
	filename := keyVal["filename"]

	check, err1 := database.Query("SELECT * FROM bin where filename=?", filename)
	if err1 != nil {
		log.Fatal(err1.Error())
	}

	defer check.Close()

	for check.Next() {
		var move Files
		err := check.Scan(&move.FileId, &move.Filename, &move.DeviceId, &move.DeviceName, &move.Filesize, &move.FileVersion)
		if err != nil {
			log.Fatal(err.Error())
		}
		dbQuery, err := database.Prepare("INSERT INTO files (file_id, filename, device_id, device_name, file_size, file_version) VALUES(?,?,?,?,?,?)")
		if err != nil {
			log.Fatal(err.Error())
		}

		_, err = ioutil.ReadAll(r.Body)
		if err != nil {
			log.Fatal(err.Error())
		}

		_, err1 := dbQuery.Exec(&move.FileId, &move.Filename, &move.DeviceId, &move.DeviceName, &move.Filesize, &move.FileVersion)
		if err1 != nil {
			log.Fatal(err1.Error())
		}
		_, err = database.Query("DELETE FROM bin where filename=?", filename)
		if err != nil {
			log.Fatal(err.Error())
		}
		fmt.Fprint(w, "Restored")
	}
}

func deleteFile(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Fatal(err.Error())
	}

	keyVal := make(map[string]string)
	json.Unmarshal(body, &keyVal)
	filename := keyVal["filename"]

	check, err1 := database.Query("SELECT * FROM bin where filename=?", filename)
	if err1 != nil {
		log.Fatal(err1.Error())
	}

	defer check.Close()

	for check.Next() {
		var move Files
		err := check.Scan(&move.FileId, &move.Filename, &move.DeviceId, &move.DeviceName, &move.Filesize, &move.FileVersion)
		if err != nil {
			log.Fatal(err.Error())
		}
		_, err = database.Query("DELETE FROM bin where filename=?", filename)
		if err != nil {
			log.Fatal(err.Error())
		}
		fmt.Fprint(w, "Deleted")
	}
}

func spaceGraph(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	body, err1 := ioutil.ReadAll(r.Body)
	if err1 != nil {
		log.Fatal(err1.Error())
	}

	keyVal := make(map[string]string)
	json.Unmarshal(body, &keyVal)
	email := keyVal["email"]
	check, err := database.Query("SELECT SUM(file_size) FROM files WHERE device_id IN"+
		"(SELECT device_id FROM devices where email=? )", email)

	if err != nil {
		log.Fatal(err.Error())
	}

	defer check.Close()

	check1, err1 := database.Query("SELECT subscription_plan FROM users WHERE email=?", email)
	if err1 != nil {
		log.Fatal(err.Error())
	}
	defer check1.Close()

	var pie Pie
	for check.Next() {

		err := check.Scan(&pie.SpaceOccupied)
		if err != nil {
			log.Fatal(err.Error())
		}
	}

	for check1.Next() {
		err1 = check1.Scan(&pie.Plan)
		if err != nil {
			log.Fatal(err.Error())
		}
	}

	pie.SpaceLeft = 1000.0

	json.NewEncoder(w).Encode(pie)
}

func columnGraph(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	body, err1 := ioutil.ReadAll(r.Body)
	if err1 != nil {
		log.Fatal(err1.Error())
	}

	keyVal := make(map[string]string)
	json.Unmarshal(body, &keyVal)
	email := keyVal["email"]
	check, err := database.Query("SELECT device_id, COUNT(filename) FROM files WHERE device_id IN"+
		"(SELECT device_id FROM devices WHERE email =? ) ", email)

	if err != nil {
		log.Fatal(err.Error())
	}
	defer check.Close()

	var values Column
	for check.Next() {
		err := check.Scan(&values.Device, &values.Files)
		if err != nil {
			log.Fatal(err.Error())
		}

	}

	// pie.SpaceOccupied = spaceOccupied
	// pie.SpaceLeft = 1000.0

	json.NewEncoder(w).Encode(values)
}

func GenerateToken(pass string) string {
	hash, err := bcrypt.GenerateFromPassword([]byte(pass), bcrypt.DefaultCost)
	if err != nil {
		log.Fatal(err)
	}
	return string(hash)
}

func comparePasswords(hashedPwd string, plainPwd string) bool {
	// Compare and hash takes only byte
	byteHash := []byte(hashedPwd)
	Pwd := []byte(plainPwd)
	err := bcrypt.CompareHashAndPassword(byteHash, Pwd)
	if err != nil {
		log.Println(err)
		return false
	}
	return true
}

func hashpassword(pass string) string {
	hashpass, err := bcrypt.GenerateFromPassword([]byte(pass), bcrypt.DefaultCost)
	if err != nil {
		log.Fatal(err)
	}
	return string(hashpass)
}

func GenerateJWT(username string) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)

	claims["authorized"] = false
	claims["user"] = username
	claims["exp"] = time.Now().Add(time.Minute * 30).Unix()

	tokenString, err := token.SignedString([]byte("mySigningKey"))

	if err != nil {
		fmt.Errorf("Error", err.Error())
		return "", err
	}
	return tokenString, nil
}
