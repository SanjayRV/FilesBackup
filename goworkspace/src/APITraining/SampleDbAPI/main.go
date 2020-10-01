package main

import (
	"database/sql"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

var database *sql.DB

func main() {
	var err error
	database, err = InitializeDatabase()
	if err != nil {
		log.Fatal("Database connection failed")
	}
	log.Println("Database connection successful")
	defer database.Close()
	//set up router
	router := mux.NewRouter()
	router.HandleFunc("/api/posts", getPosts).Methods("GET")
	router.HandleFunc("/api/posts", createPost).Methods("POST")
	router.HandleFunc("/api/posts/{id}", getPostByid).Methods("GET")
	router.HandleFunc("/api/posts/{id}", updatePost).Methods("PUT")
	router.HandleFunc("/api/posts/{id}", deletePost).Methods("DELETE")

	//listen
	log.Fatal(http.ListenAndServe(":8082", router))
}
