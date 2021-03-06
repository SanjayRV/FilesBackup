package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql" //to use mysql
)

//InitializeDatabase database
func InitializeDatabase() (*sql.DB, error) {
	username := "sanjay"
	password := "Welcome321"

	serverName := "localhost:3306"
	dbName := "login"

	connectionString := fmt.Sprintf("%s:%s@tcp(%s)/%s", username, password, serverName, dbName)

	db, err := sql.Open("mysql", connectionString)
	if err != nil {
		log.Println("Printing error...")
		return nil, err
	}
	return db, nil
}
