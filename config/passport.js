const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

const db = require("../models")

// Telling passporrt we want to use a Local strategy. We want to login with a username.
passport.use(new LocalStrategy (
    // Our user will sign in using an email, rather than a "username"
    {
        usernameField: "email"
    },
    function (email, password, done) {
        // When a user tries to sign in this code runs
        db.user.findOne({
            where: {
                email: email
            }
        }).then(function (dbUser) {
            if (!dbUser) {
                return done(null, false, {
                    message: "Incorrect email."
                })
            }
            // If there is a user with the given email, but the password the user gives is incorrect
            else if (!dbUser.validPassword(password)) {
                return done(null, false, {
                    message: "Incorrect password."
                })
            }
            // If none of the above, return the user
            return done(null, dbUser)
        })
    }
))

// In order to help keep auth state across HTTP requests
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make iot all work
passport.serializeUser(function( user, cb) {
    cb(null, user)
})
passport.deserializeUser(function( obj, cb) {
    cb(null, obj)
})

// Exporting our configured passport

module.exports = passport