const express = require("express")
const router = express.Router()
const homeController = require("../controllers/home")
const { ensureAuthenticated } = require("../controllers/auth")

router.get("/", homeController.getHome)
router.get("/login", homeController.getLogin)
router.get("/signup", homeController.getSignup)
router.post("/signup", homeController.postSignup)

router.post("/login", homeController.postLogin)
router.get("/dashboard", ensureAuthenticated, homeController.dashy)
router.get("/menu1", ensureAuthenticated, homeController.menu1)
router.get("/dishtest", ensureAuthenticated, homeController.dishtest)
router.get("/logout", (req, res) => {
    req.logout(() => {
        console.log('User has logged out.')
    })
    req.flash('success_msg', 'You are logged out')
    res.redirect('/login')
})
router.get("/test", (req,res) => {
    res.render("selection.ejs")
})
router.get("/addReview", ensureAuthenticated, homeController.addReview)

// router.get("/postreview", (req,res) => {
//     res.render("postreview.ejs", {
//         user: req.user.username
//     })
// })
router.post("/postreview2", homeController.postReviewTwo)
// router.post("/postreview", homeController.postReview)
router.get("/truffledelight", ensureAuthenticated, homeController.truffledelight)
router.get("/margheritaclassic", ensureAuthenticated, homeController.margheritaclassic)
router.get("/fourcheeseheaven", ensureAuthenticated, homeController.fourcheeseheaven)

module.exports = router