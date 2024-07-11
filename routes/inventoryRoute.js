// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")

const classificationValidate = require('../utilities/inventory-validation')

const inventoryValidate = require('../utilities/inventory-validation')

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);


// Route to build inventory by details view
router.get("/detail/:inventoryId", invController.buildByDetailId);

// Route to build Manage Inventory view
//router.get("/manage", invController.buildManageInventory);
router.get("/manage", utilities.handleErrors(invController.buildManageInventory))


// Route to build the new classification view
router.get("/newclassification", utilities.handleErrors(invController.buildNewClassification))

// Process the classification data
router.post(
    "/add-classification",
    classificationValidate.classificationRules(),
    classificationValidate.checkClassificationData,
    utilities.handleErrors(invController.newClassification)
  )



// Route to build the new inventory view
router.get("/newinventory", utilities.handleErrors(invController.buildNewInventory))

// Process the inventory data
router.post(
  "/add-inventory",
  inventoryValidate.inventoryRules(),
  inventoryValidate.checkInventoryData,
  utilities.handleErrors(invController.newInventory)
)


module.exports = router;

