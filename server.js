// Require express package
const express = require('express')
// Tie express() to app
const app = express()
// Require path leading to .env to access env variables
require("dotenv").config({ path: "./config/.env"})
// PORT chosen in .env file
const port = process.env.PORT
// Require flash message
const flash = require("express-flash")
// Require session package
const session = require('express-session')
// Require mongoose package
const mongoose = require('mongoose')
// Something...
const MongoStore = require("connect-mongo")
// Routes for home
const homeRoutes = require("./routes/home")
// Path to connectDB function
const connectDB = require("./config/database")
// Require passport package
const passport = require("passport")
// Route to passport config
require("./config/passport")(passport)


// Call the connect function
connectDB()

// Something... Something... Session...
app.use(session({
	secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
	store: MongoStore.create({ mongoUrl: process.env.DB_CONNECTION}),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

// Setting our view engine
app.set("view engine", "ejs")
// Setting our static files in public
app.use(express.static("public"))
// Something...
app.use(express.json())
// Need this when using FORMS
app.use(express.urlencoded({extended: true}))

// Something...
app.use(passport.initialize())
app.use(passport.session())

// Enables flash messages
app.use(flash())

app.use((req,res,next) => {
    res.locals.success_msg = req.flash('sucess_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})

// when the apps hears "/", go into homeRoutes for further directions
app.use("/", homeRoutes)

// Servers starts on PORT 3000 and console.log gives visual confirmation of server startup
app.listen(port, () => console.log(`Server is running on PORT ${port}`))