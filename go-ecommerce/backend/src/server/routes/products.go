package routes

import (
	"bufio"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/google/uuid"
	Database "monk.com/monk/src/server/database"
)

type Products struct {
	Product    string `json:"product"`
	Technology string `json:"technology"`
	Color      string `json:"color"`
	Price      string `json:"price"`
	Size       string `json:"size"`
}

func Check(e error) {
	if e != nil {
		log.Println(e)
	}
}

func AddProduct(w http.ResponseWriter, r *http.Request) {

	//Open Up a connection to the database
	db := Database.Connection()

	//Close Connectio after all the process are done
	defer db.Close()

	//Create the Product ID
	ID := uuid.New()

	productId := strings.Replace(ID.String(), "-", "", -1)

	productId = string(productId)

	//Parse the data from the request and store it in our Products variable
	products := Products{}

	products.Color = r.FormValue("color")
	products.Price = r.FormValue("price")
	products.Product = r.FormValue("product")
	products.Size = r.FormValue("size")
	products.Technology = r.FormValue("technology")

	body, err := ioutil.ReadAll(r.Body)

	if err != nil {
		fmt.Fprintf(w, "There was an error")
	}

	defer r.Body.Close()

	json.Unmarshal(body, &products)

	//Add the values to the database

	insertQuery := "Insert into Products (`Color`,`Price`,`Technology`,`Size`,`Type`, `Product ID`) Values (?,?,?,?,?,?)"

	stmt1, err := db.Prepare(insertQuery)

	if err != nil {
		fmt.Print(err)
	}
	defer stmt1.Close()

	stmt1.Exec(&products.Color, &products.Price, &products.Technology, &products.Size, &products.Product, &productId)

	//Parse the data to a multiplat form data

	r.ParseMultipartForm(32 << 20)

	m := r.MultipartForm
	files := m.File["file"]

	//Loop through the multiple Files

	//Image Url to save Image file Paths

	for i, _ := range files {
		file, err := files[i].Open()

		if err != nil {
			fmt.Print(err)
		}
		defer file.Close()

		//Create a A directory to the server to hold the image

		fileCopy, err := os.Create("uploads/" + files[i].Filename)
		if err != nil {
			fmt.Print(err)
		}
		//read the Contents of the file

		//Copy the contents of the image to the file created above

		_, err = io.Copy(fileCopy, file)
		if err != nil {
			fmt.Print(err)
		}

		//Save the Image Url to the DataBase

		query := "Insert Into Images (`ImageURL`,`ProductID`) values (?,?)"

		stmt, err := db.Prepare(query)
		if err != nil {
			log.Print(err)
		}
		defer stmt.Close()

		_, err = stmt.Exec(&files[i].Filename, productId)

		if err != nil {
			log.Print(err)
		}

	}
	w.WriteHeader(200)

}

func GetProducts(w http.ResponseWriter, r *http.Request) {

	//Open and close Connection to database
	db := Database.Connection()

	defer db.Close()

	//Model for the data recieved from the database

	type ProductsImages struct {
		Product    string `json:"product"`
		Technology string `json:"technology"`
		ProductID  string `json:"productID"`
		Color      string `json:"color"`
		Price      int    `json:"price"`
		Size       string `json:"size"`
		ImageUrl   []string
	}

	var products ProductsImages

	//Queries to get Data from the database
	query := "Select `Color`,`Technology`,`Size`,`Price`,`Product ID`,`Type` from products"

	rows, err := db.Query(query)

	if err != nil {
		fmt.Print(err)
	}
	defer rows.Close()

	var a []ProductsImages

	for rows.Next() {
		err := rows.Scan(&products.Color, &products.Technology, &products.Size, &products.Price, &products.ProductID, &products.Product)
		a = append(a, products)
		if err != nil {
			fmt.Print(err)
		}

	}

	//Get the Image URL Strings
	var FinalProduct []ProductsImages

	//Loop over the products to get the Image Urls

	for _, product := range a {

		id := product.ProductID

		query := "select `ImageURL` from images where ProductID = ?"

		rows, err := db.Query(query, id)

		if err != nil {
			fmt.Print(err)
		}
		defer rows.Close()

		urls := make([]string, 0)

		//Loop over the results and store and read the  the URL in an array of ImageUrl

		for rows.Next() {
			var url string
			err := rows.Scan(&url)

			if err != nil {
				fmt.Print(err)
			}

			dat, err := os.Open("uploads/" + url)

			if err != nil {
				fmt.Print(err)
			}
			defer dat.Close()

			//Convert the image into a Base64 format

			reader := bufio.NewReader(dat)
			content, _ := ioutil.ReadAll(reader)

			encoded := base64.StdEncoding.EncodeToString(content)

			urls = append(urls, encoded)
		}
		product.ImageUrl = urls

		FinalProduct = append(FinalProduct, product)
	}

	// //Set the header to show that the data is of JSON type
	w.Header().Set("Content-Type", "application/json")

	//Convert the data to a JSON

	data, err := json.Marshal(FinalProduct)
	if err != nil {
		fmt.Print(err)
	}

	// Send the response with the data
	w.Write(data)

}

func UpdateProduct(w http.ResponseWriter, r *http.Request) {

	//Open and close the database Connection to make the changes
	db := Database.Connection()

	defer db.Close()

	//Get the data from the request header and Parse it to our Products structure

	products := Products{}

	products.Color = r.FormValue("color")
	products.Price = r.FormValue("price")
	products.Product = r.FormValue("product")
	products.Size = r.FormValue("size")
	products.Technology = r.FormValue("technology")
	id := r.FormValue("id")

	//Use The data and Product ID to update the Particular Update

	query := "Update `products` SET `Color` = ?,`Price` = ?,`Technology` = ?,`Size` = ?,`Type` = ? Where `Product ID` = ?"

	_, err := db.Exec(query, &products.Color, &products.Price, &products.Technology, &products.Size, &products.Product, &id)

	if err != nil {
		fmt.Print(err)
	}

	//Send OK as Response
	fmt.Fprint(w, "OK")

}

func DeleteProduct(w http.ResponseWriter, r *http.Request) {
	//Open a connection to The database

	db := Database.Connection()

	defer db.Close()

	//Get the ID to use in the query for deleting the product
	var id1 string

	id, err := ioutil.ReadAll(r.Body)

	if err != nil {
		fmt.Print(err)
	}

	json.Unmarshal(id, &id1)

	//Query String

	query := "Delete From products Where `products`.`Product ID` = ?"

	//Execute the Query
	_, err = db.Exec(query, id)

	if err != nil {
		fmt.Print(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	//Send status 200 as the header response if no error is detected
	w.WriteHeader(200)
}
