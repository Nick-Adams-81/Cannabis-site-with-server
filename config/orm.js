// Requiring config connection

const connection = require('../config/connection.js')

// Function for printing question marks
function printQuestionMarks() {
    let arr=[];

    for(let i = 0; i < num ; i ++) {
        arr.push("?")
    }
    return arr.toString()
}

// Convert key/value pairs into SQL syntax
function objToSql() {
    let arr=[]

    for (let key in obj) {
        let value = ob[key]

        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "" + value + ""
            }
            err.push(key + "=" + value)
        }
    }
    return arr.toString()
}

// Setting up our orm model
const orm = {
    all: function (tableInput, cb) {
        let queryString = "SELECT * FROM " + tableInput + ";"
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err
            }
            cb(result)
        })
    },
    // Create table function
    create: function (table, cols, vals, cb) {
        let queryString = "INSERT INTO " + table
        
        queryString += " ("
        queryString += cols.toString()
        queryString += ") "
        queryString += "VALUES ("
        queryString += printQuestionMarks(vals.length)
        queryString += ") "

        console.log(queryString)

        connection.query(queryString, vals, function(err, result) {
            if (err) {
                throw err
            }
            cb(result)
        })

    },
    // Update table function
    update: function(table, objColVals, condition, cb) {
        let queryString = "UPDATE " + table

        queryString += " SET "
        queryString += "eaten = 1"
        queryString += "WHERE"
        queryString += condition

        console.log(queryString)

        connection.query(queryString, function (err, result) {
            if (err) {
                throw err
            }
            cb(result)
        })
    }
 
}

// Export the orm object for the model
module.expoorts = orm