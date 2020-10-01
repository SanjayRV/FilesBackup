package main

import (
	database "APITraining/Database"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()
	setupRouter(router)
	log.Fatal(http.ListenAndServe(":8082", router))
}

func setupRouter(router *mux.Router) {
	router.
		Methods("post").
		Path("/endpoint").
		HandlerFunc(postFunction)
}
func postFunction(w http.ResponseWriter, r *http.Request) {
	log.Println("Called")
	dbhandler, err := database.InitializeDatabase()
	if err != nil {
		log.Fatal("Database connection failed")
	}
	log.Println("Database connection successful")

	_, errFromDB := dbhandler.Exec("INSERT into `demo` (Name) VALUES ('DEF')")
	if errFromDB != nil {

		log.Fatal("Could not insert")
	}
	log.Println("Successfully inserted")

}
