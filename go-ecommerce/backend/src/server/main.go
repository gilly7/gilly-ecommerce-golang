package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"monk.com/monk/src/server/routes"
)

var r *mux.Router

func homepage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Welcome to my API")
}
func handlers() {
	r = mux.NewRouter()
	r.HandleFunc("/register", routes.RegisterUsers).
		Methods("Post")
	r.HandleFunc("/login", routes.LogIn).
		Methods("Post")
	r.HandleFunc("/add-products", routes.AddProduct).
		Methods("Post")
	r.HandleFunc("/getProducts", routes.GetProducts).
		Methods("GET")
	r.HandleFunc("/update-product", routes.UpdateProduct).
		Methods("POST")
	r.HandleFunc("/delete-product", routes.DeleteProduct).
		Methods("DELETE")
	r.HandleFunc("/", homepage).Methods("GET")

	// http.Handle("/", r)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowCredentials: true,
	})
	handler := c.Handler(r)

	http.ListenAndServe(":9000", handler)
}

func main() {
	handlers()
	fmt.Println("Started working")
}
