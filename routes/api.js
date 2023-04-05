var express = require("express");
var router = express.Router();
var UserController = require("../controllers/userController/userController");
var RestaurantHouseController = require("../controllers/restaurantHouseController/restaurantHouseController");
var ChefController = require("../controllers/chefController/chefController");
var EntertainerController = require("../controllers/entertainerController/entertainerController");
var PropertyController = require("../controllers/propertyController/propertyController");

const auth = require("../middleware/auth");

// USER ROUTES
router.post("/user", UserController.createUser);
router.post("/login", UserController.login);
router.post("/verifyOtp", UserController.verifyOtp);
router.get("/verify/:token", UserController.EmailConfirmation);

// RESTAURANTHOUSE ROUTES
router.get(
  "/restaurantHouse",
  auth,
  RestaurantHouseController.getRestaurantHouse
);
router.post(
  "/restaurantHouse",
  auth,
  RestaurantHouseController.CreateRestaurantHouse
);
router.put(
  "/restaurantHouse",
  auth,
  RestaurantHouseController.UpdateRestaurantHouse
);
router.delete(
  "/restaurantHouse",
  auth,
  RestaurantHouseController.DeleteRestaurantHouse
);

// CHEF ROUTES
router.get("/allchefs", ChefController.getAllChefs);
router.get("/chef", ChefController.getChef);
router.post("/chef", auth, ChefController.CreateChef);
router.put("/chef", auth, ChefController.UpdateChef);
router.delete("/chef", auth, ChefController.DeleteChef);

// ENTERTAINER ROUTES
router.get("/allentertainers", EntertainerController.getAllEntertainers);
router.get("/entertainer", EntertainerController.getEntertainer);
router.post("/entertainer", auth, EntertainerController.CreateEntertainer);
router.put("/entertainer", auth, EntertainerController.UpdateEntertainer);
router.delete("/entertainer", auth, EntertainerController.DeleteEntrtainer);

// PROPERTY ROUTES
router.get("/allproperties", PropertyController.getAllProperties);
router.get("/property", PropertyController.getProperty);
router.post("/property", auth, PropertyController.CreateProperty);
router.put("/property", auth, PropertyController.UpdateProperty);
router.delete("/property", auth, PropertyController.DeleteProperty);

module.exports = router;
