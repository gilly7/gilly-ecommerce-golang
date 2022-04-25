package database

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

func Connection() (DB *sql.DB) {

	dbDriver := "mysql"
	dbUser := "root"
	dbName := "monk"

	db, err := sql.Open(dbDriver, dbUser+":"+"@/"+dbName+"?parseTime=true")

	if err != nil {
		panic(err.Error())
	}

	return db
}
