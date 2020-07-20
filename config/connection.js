// Mysql connection set up
const mysql = require("mysql")
let connection;
if (process.env.JAWS_DB_URL) {
    connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "Theking1@",
        database: "cannabis_site_db"
    })
}

// Make connection
connection.connect(function (err) {
    if (err) {
        console.log("error connecting: " + err.stack)
        return
    }
    console.log("connected as id: " + connection.threadId)
})

// Export connection for ORM to use
module.exports = connection