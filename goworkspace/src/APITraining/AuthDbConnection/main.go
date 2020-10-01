package main

import (
	"database/sql"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
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

	headers := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"})
	origins := handlers.AllowedOrigins([]string{"*"})

	router.HandleFunc("/api/createUser", createUser).Methods("POST")
	router.HandleFunc("/api/login", login).Methods("POST")
	router.HandleFunc("/api/createFile", createFile).Methods("POST")
	router.HandleFunc("/api/createFile2", createFile2).Methods("POST")
	router.HandleFunc("/api/fileToTrash", fileToTrash).Methods("POST")
	router.HandleFunc("/api/restore", restore).Methods("POST")
	router.HandleFunc("/api/deleteFile", deleteFile).Methods("POST")
	router.HandleFunc("/api/spaceGraph", spaceGraph).Methods("POST")
	router.HandleFunc("/api/columnGraph", columnGraph).Methods("POST")

	//listen
	//log.Fatal(http.ListenAndServe(":8082", router))
	http.ListenAndServe(":8082", handlers.CORS(headers, methods, origins)(router))
}
