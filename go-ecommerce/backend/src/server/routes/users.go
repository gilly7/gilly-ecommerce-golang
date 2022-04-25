package routes

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	Database "monk.com/monk/src/server/database"
)

type User struct {
	FirstName string `json:"first"`
	LastName  string `json:"last"`
	Email     string `json:"email"`
	Password  string
	// UserID    string
}

func RegisterUsers(w http.ResponseWriter, r *http.Request) {

	// Open the connection to the database which is in the database package
	db := Database.Connection()
	// fmt.Fprint(w, "Registration page")
	defer db.Close()

	//Check the method on the header request
	if r.Method != "POST" {
		fmt.Fprint(w, "Invalid Operation")
		return
	}

	//generating unique IDs for the user
	id := uuid.New().String()

	// Get the Json from the request Body and convert it to byte and save it in a user struct
	user := User{}

	body, err := ioutil.ReadAll(r.Body)

	if err != nil {
		log.Print("There is no json", err)
	}
	defer r.Body.Close()

	json.Unmarshal(body, &user)

	// //hashing password
	word := user.Password
	pass, err := bcrypt.GenerateFromPassword([]byte(word), 10)
	if err != nil {
		log.Fatal(err.Error())
	}

	user.Password = string(pass)

	//mysql query to be executed to insert the users details in the ddatabase

	stmt, err := db.Prepare("Insert into `users` Values (?,?,?,?,?)")
	if err != nil {
		log.Fatal("user not registered: Check all the fields", err)
	}

	//Free the database resources by closing the statement/query connection
	defer stmt.Close()

	_, err = stmt.Exec(&user.FirstName, &user.LastName, &user.Email, user.Password, id)
	if err != nil {
		log.Fatal("User not added to the database", err)
	}
	fmt.Fprint(w, "User Added:")
	fmt.Fprint(w, user)

}

func LogIn(w http.ResponseWriter, r *http.Request) {

	//This is the details for the user loggin in
	type userInfo struct {
		Email    string
		Password string
	}

	// Confirming its a post Method
	if r.Method != "POST" {
		fmt.Print("Invalid Operation")
	}

	// Get the and Parse the data from the request Body
	userDetails := userInfo{}

	body, err := ioutil.ReadAll(r.Body)

	if err != nil {
		fmt.Print("There was an error readinf the request", err)
	}

	json.Unmarshal(body, &userDetails)
	fmt.Print(userDetails)

	// Get the Particular User With their unique Email
	db := Database.Connection()

	defer db.Close()

	// This is the registered User
	user := User{}

	row := db.QueryRow("SELECT `firstName`, `Second Name`, `Email`,`Password` FROM users WHERE Email = ?", userDetails.Email)

	err = row.Scan(&user.FirstName, &user.LastName, &user.Email, &user.Password)

	if err != nil {
		if err == sql.ErrNoRows {
			fmt.Fprint(w, "No such User")
			return
		} else {
			panic(err)
		}
	}
	fmt.Print(user)

	//Compare the Password with the one Hashed and stored in the database
	byteHash := []byte(user.Password)

	err = bcrypt.CompareHashAndPassword(byteHash, []byte(userDetails.Password))

	if err != nil {
		fmt.Fprint(w, "Not Authenticated")
		return
	}

	fmt.Fprint(w, "Authenticated")
}
