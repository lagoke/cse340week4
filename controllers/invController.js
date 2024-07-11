const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}


module.exports = invCont

/* ***************************
 *  Build inventory by detail view
 * ************************** */
invCont.buildByDetailId = async function (req, res, next) {
  const inventoryId = req.params.inventoryId
  const data = await invModel.getInventoryByInventoryId(inventoryId)
  const grid = await utilities.buildInventoryDetailGrid(data)
  let nav = await utilities.getNav()
  const vehicle_make = data[0].inv_make
  const vehicle_model = data[0].inv_model
  res.render("./inventory/detail", {
    title: vehicle_make + " " +  vehicle_model,
    nav,
    grid,
  })
}



/* ****************************************
*  Deliver Manage Inventory view
* *************************************** */
//async function buildManageInventory(req, res, next) {

  invCont.buildManageInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/management", {
    title: "Manage Inventory",
    nav,
    errors: null,
  })
}



/* ****************************************
*  Deliver Create new Classification view
* *************************************** */
invCont.buildNewClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title: "Add New Classification",
    nav,
    errors: null,
  })
}




/* ****************************************
*  Deliver Create new Inventory view
* *************************************** */
invCont.buildNewInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  let select_classification = await utilities.buildClassificationList()
  res.render("inventory/add-inventory", {
    title: "Add New Inventory",
    nav,
    select_classification,
    errors: null,
  })
}






/* ****************************************
*  Process New Classification
* *************************************** */
invCont.newClassification = async function(req, res) {
  let nav = await utilities.getNav()
  const { classification_name} = req.body

  const classificationResult = await invModel.createNewClassification(
    classification_name

  )

  if (classificationResult) {
    req.flash(
      "notice",
      `Congratulations, New Classification created successfully`
    )
    res.status(201).render("inventory/management", {
      title: "Manage Inventory",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, creation of new classification failed.")
    res.status(501).render("inv/add-classification", {
      title: "Add New Classification",
      nav,
    })
  }
}





/* ****************************************
*  Process New Inventory
* *************************************** */
invCont.newInventory = async function(req, res) {
  let nav = await utilities.getNav()
  const { inv_name, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id} = req.body

  const inventoryResult = await invModel.createNewInventory(
    inv_name, 
    inv_model, 
    inv_year, 
    inv_description, 
    inv_image, 
    inv_thumbnail, 
    inv_price, 
    inv_miles, 
    inv_color, 
    classification_id

  )

  if (inventoryResult) {
    req.flash(
      "notice",
      `Congratulations, New Inventory created successfully`
    )
    res.status(201).render("inventory/management", {
      title: "Manage Inventory",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, creation of new inventory failed.")
    res.status(501).render("inv/add-inventory", {
      title: "Add New Inventory",
      nav,
    })
  }
}

