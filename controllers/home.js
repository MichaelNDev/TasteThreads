const User = require("../models/User")
const Review = require("../models/Review")
const Temp = require("../models/Temp")
const passport = require("passport")


module.exports = {
    getHome: (req,res) => {
        res.render("home.ejs")
    },
    getLogin: (req,res) => {
        res.render("login.ejs")
    },
    getSignup: (req,res) => {
        res.render("signup.ejs")
    },
    postSignup: (req,res) => {
        const { username, email, password, confirmPassword } = req.body
        let errors = []

        // check required fields
        if(!username || !email || !password || !confirmPassword) {
            errors.push({msg: 'Please fill in all fields.'})
        } else {

            // check passwords match
            if(password !== confirmPassword){
                errors.push({msg: 'Passwords do not match.'})
            }

            // check pass length
            if(password.length < 6){
                errors.push({msg: 'Password should be at least 6 characters.'})
            }
        }
        

        if(errors.length > 0){
            console.log(errors)
            res.render("signup", {
                errors,
                username,
                email,
                password,
                confirmPassword
            })
        } else {
            // Validation passed
            User.findOne({email: email})
                .then(user => {
                    if(user) {
                        // User exists
                        errors.push({ msg: 'Email is already registered'})
                        res.render("signup", {
                            errors,
                            username,
                            email,
                            password,
                            confirmPassword
                        })
                    } else {
                        const newUser = new User({
                            username,
                            email,
                            password
                        })

                        newUser.save()
                            .then(user => {
                                console.log("User data saved")
                                req.flash("sucess_msg", "You are now registered and can log in.")
                                res.redirect("/login")
                            })
                            .catch(err => console.log(err))
                    }
                })
        }
    },
    postLogin: (req,res,next) => {
        passport.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next)
    },
    dashy: (req,res) => 
    res.render("selection", {
        user: req.user.username
    }),
    menu1: (req,res) => {
        res.render("menu1", {
        user: req.user.username
        })
    }
    ,
    dishtest: async (req,res) => {
        try {
            const posts = await Review.find()
            res.render("dishtest.ejs", { posts: posts, username: req.user.username })
            console.log(req.user)
        } catch (err) {
            console.log(err)
        }
    },
    addReview: (req,res) => 
    res.render("addreview"),
    // postReview: async (req,res) => {
    //     try {
    //         await Review.create({
    //             text: req.body.text,
    //             user: req.user._id

    //         })
    //         console.log("Review has been added!")
    //         res.redirect("/truffledelight")
    //     } catch(err) {
    //         console.log(err)
    //     }
    // },
    postReviewTwo: async (req,res) => {
        let dishName = req.body.dishname.toLowerCase().split(" ").join("")
        try {
            await Temp(dishName).create({
                text: req.body.text,
                rating: req.body.rating,
                user: req.user.username
            })
            console.log("Review has been added!")
            res.redirect(`/${dishName}`)
        } catch(err) {
            console.log(err)
        }
    },
    truffledelight: async (req,res) => {
        let dishName = 'truffledelight'
        try {
            const post = await Temp(dishName).find()
            res.render("truffledelight.ejs", { posts: post, username: req.user.username })
            console.log(req.user)
        } catch (err) {
            console.log(err)
        }
    },
    margheritaclassic: async (req,res) => {
        let dishName = 'margheritaclassic'
        try {
            const post = await Temp(dishName).find()
            res.render("margheritaclassic.ejs", { posts: post, username: req.user.username })
            console.log(req.user)
        } catch (err) {
            console.log(err)
        }
    },
    fourcheeseheaven: async (req,res) => {
        let dishName = 'fourcheeseheaven'
        try {
            const post = await Temp(dishName).find()
            res.render("fourcheeseheaven.ejs", { posts: post, username: req.user.username })
            console.log(req.user)
        } catch (err) {
            console.log(err)
        }
    }
    
}