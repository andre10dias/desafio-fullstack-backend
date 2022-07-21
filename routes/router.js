const express = require("express");
const router = express.Router();

const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");
const VehicleController = require("../controllers/VehicleController");
const VehicleDataController = require("../controllers/VehicleDataController");

//Rota home
router.get('/', HomeController.index);

//Rota usuários
router.get('/user', UserController.index);
router.get('/user/:id', UserController.findUser);
router.post('/user', UserController.create);
router.put('/user', UserController.edit);
router.delete('/user/:id', UserController.remove);
router.post("/user/password", UserController.changePassword);
router.post("/user/login", UserController.login);

//Rota veículos
router.get('/vehicle', VehicleController.index);
router.get('/vehicle/:id', VehicleController.findVehicle);
router.post('/vehicle', VehicleController.create);
router.put('/vehicle', VehicleController.edit);
router.delete('/vehicle/:id', VehicleController.remove);

//Rota data veículos
router.get('/vehicleData', VehicleDataController.index);
router.get('/vehicleData/:id', VehicleDataController.findVehicleData);
router.post('/vehicleData', VehicleDataController.create);
router.put('/vehicleData', VehicleDataController.edit);
router.delete('/vehicleData/:id', VehicleDataController.remove);

module.exports = router;