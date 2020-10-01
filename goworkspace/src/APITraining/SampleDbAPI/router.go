package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func getPosts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var posts []Post
	log.Println("Fetching posts")
	result, err := database.Query("SELECT id, title from posts")
	if err != nil {
		log.Fatal(err.Error())
	}
	defer result.Close()

	for result.Next() {
		var post Post
		err := result.Scan(&post.ID, &post.Title)
		if err != nil {
			log.Fatal(err.Error())
		}
		posts = append(posts, post)
	}
	json.NewEncoder(w).Encode(posts)
}

func getPostByid(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	param := mux.Vars(r)
	result, err := database.Query("SELECT id, title FROM posts WHERE id = ?", param["id"])
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	defer result.Close()

	var post Post
	for result.Next() {
		err := result.Scan(&post.ID, &post.Title)
		if err != nil {
			log.Fatal(err.Error())
		}
	}
	json.NewEncoder(w).Encode(post)
}

func createPost(w http.ResponseWriter, r *http.Request) {
	dbQuery, err := database.Prepare("INSERT INTO posts (id, title) VALUES(?,?)")
	if err != nil {
		log.Fatal(err.Error())
	}
	log.Println("Creating a post")

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Fatal(err.Error())
	}

	keyVal := make(map[string]string)
	json.Unmarshal(body, &keyVal)
	id := keyVal["id"]
	title := keyVal["title"]

	_, err1 := dbQuery.Exec(id, title)
	if err1 != nil {
		log.Fatal(err1.Error())
	}
	fmt.Fprint(w, "New post was created")
}

func updatePost(w http.ResponseWriter, r *http.Request) {
	param := mux.Vars(r)
	dbQuery, err := database.Prepare("UPDATE posts SET title = ? WHERE id = ?")
	if err != nil {
		log.Fatal(err.Error())
	}
	log.Println("Updating a post")

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Fatal(err.Error())
	}

	keyVal := make(map[string]string)
	json.Unmarshal(body, &keyVal)
	newTitle := keyVal["title"]
	_, err1 := dbQuery.Exec(newTitle, param["id"])
	if err1 != nil {
		log.Fatal(err1.Error())
	}
	fmt.Fprint(w, "Updated a post")
}

func deletePost(w http.ResponseWriter, r *http.Request) {
	param := mux.Vars(r)
	dbQuery, err := database.Prepare("DELETE FROM posts WHERE id=?")
	if err != nil {
		log.Fatal(err.Error())
	}
	log.Println("Deleting a post")

	_, err = ioutil.ReadAll(r.Body)
	if err != nil {
		log.Fatal(err.Error())
	}

	//keyVal := make(map[string]string)
	//json.Unmarshal(body, &keyVal)
	//id := keyVal["id"]
	//title := keyVal["title"]
	_, err1 := dbQuery.Exec(param["id"])
	if err1 != nil {
		log.Fatal(err1.Error())
	}
	fmt.Fprint(w, "Deleted a post")
}
