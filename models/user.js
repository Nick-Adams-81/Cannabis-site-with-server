// Requiring bcrypt for password hashing
const bcrypt = require("bcryptjs")
// Creating the user model
module.exports = function( sequelize, DataTypes) {
    const User = sequelize.define("user", {
        // Email cannot be null, all must be a proper email before creation
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        // Password cannot be null
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    // Custom method for our user model
    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password)
    }
    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automaticallyhash their password
    User.addHook("beforeCreate", function (user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null)
    })
    return User 
}