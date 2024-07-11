// Needed Resources 
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities/")

const regValidate = require('../utilities/account-validation')



router.get("/login", utilities.handleErrors(accountController.buildLogin))

router.get("/register", utilities.handleErrors(accountController.buildRegister))

//router.post('/register', utilities.handleErrors(accountController.registerAccount))

// Process the registration data
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
  )

// Route to build login view
//router.get("/account/login", accountController.buildLogin);


// Route to build inventory by classification view
//router.get("/type/:classificationId", invController.buildByClassificationId);


module.exports = router; 