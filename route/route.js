const express = require('express');
const middleware=require("../middleware/auth")
const router = express.Router();


const controller=require("../controller/controller")
const userController=require("../controller/userController")

router.post("/createUser",userController.createAuthor)
router.post("/login",userController.loginUser)


router.get("/getFlights",middleware.authenticate, controller.getFlights)

// router.post('/login', AuthorController.loginAuthor);

module.exports = router;
