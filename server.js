//Dependencies
//=====================================================

const express = require("express")

const session = require("express-session")

const passport = require("./config/passport")

//Setting up our PORT and requiring models for syncing
//=====================================================

const PORT = process.env.PORT || 3000
const db = require("./models")

//Setting up express for data parsing
//====================================================

const app = express()

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Adding middleware needed for authentication
//===================================================
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true}))
app.use(passport.initialize())
app.use(passport.session())

// Required routes
//===================================================
require("./routes/html-routes.js")(app)
require("./routes/api-routes.js")(app)

// Synching the database and logging a message for the user upon success
//===================================================

db.sequelize.sync().then(function () {
    app.listen(PORT, function() {
        console.log("Listening on port %s. Visit http://localhoast:%s in your browser", PORT, PORT)
    })
})