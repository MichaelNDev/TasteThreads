const express = require("express")
const router = express.Router()
const homeController = require("../controllers/home")
const { ensureAuthenticated } = require("../controllers/auth")

router.get("/", homeController.getHome)
router.get("/login", homeController.getLogin)
router.get("/signup", homeController.getSignup)
router.post("/signup", homeController.postSignup)
router.post("/login", homeController.postLogin)

// Main routes to pages after login
router.get("/dashboard", ensureAuthenticated, homeController.dashy)
router.get("/menu1", ensureAuthenticated, homeController.menu1)
router.get("/menu2", ensureAuthenticated, homeController.menu2)
router.get("/menu3", ensureAuthenticated, homeController.menu3)

router.get("/logout", (req, res) => {
    req.logout(() => {
        console.log('User has logged out.')
    })
    req.flash('success_msg', 'You are logged out')
    res.redirect('/login')
})

router.get("/addReview", ensureAuthenticated, homeController.addReview)
router.post("/postreview2", homeController.postReviewTwo)
// router.post("/postreview", homeController.postReview)

// These are routes to individual pizzas
router.get("/truffledelight", ensureAuthenticated, homeController.universalDish)
router.get("/seafoodspectacular", ensureAuthenticated, homeController.universalDish)
router.get("/bbqchickenfiesta", ensureAuthenticated, homeController.universalDish)
router.get("/margheritaclassic", ensureAuthenticated, homeController.universalDish)
router.get("/pepperonibliss", ensureAuthenticated, homeController.universalDish)
router.get("/veggiegarden", ensureAuthenticated, homeController.universalDish)
router.get("/fourcheeseheaven", ensureAuthenticated, homeController.universalDish)
router.get("/spicydiavola", ensureAuthenticated, homeController.universalDish)
router.get("/pestochicken", ensureAuthenticated, homeController.universalDish)

// Routes for Menu2 items
router.get("/carneasadaplate", ensureAuthenticated, homeController.universalDish)
router.get("/quesabirriatacos", ensureAuthenticated, homeController.universalDish)
router.get("/supremeanacondaburrito", ensureAuthenticated, homeController.universalDish)
router.get("/adobadaplate", ensureAuthenticated, homeController.universalDish)
router.get("/twohardshelltacos", ensureAuthenticated, homeController.universalDish)
router.get("/twocarneasadaburritos", ensureAuthenticated, homeController.universalDish)
router.get("/twoenchiladas", ensureAuthenticated, homeController.universalDish)

// Routes for Menu3 items
router.get("/chicago7", ensureAuthenticated, homeController.universalDish)
router.get("/doubledeckeroni", ensureAuthenticated, homeController.universalDish)
router.get("/meatballmushroom", ensureAuthenticated, homeController.universalDish)
router.get("/bbqbaconcheddarburger", ensureAuthenticated, homeController.universalDish)
router.get("/chicagocheesesteaksandwich", ensureAuthenticated, homeController.universalDish)
router.get("/craftedbeerburger", ensureAuthenticated, homeController.universalDish)

module.exports = router