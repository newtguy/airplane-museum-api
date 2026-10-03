const express = require("express");

const router = express.Router();

const airplanesController = require("../controllers/airplanes");
const isAuthenticated = require("../middleware/auth");

router.get("/", (req, res) => {
  // #swagger.tags = ['Airplanes']
  // #swagger.summary = 'Get all airplanes'
  // #swagger.description = 'Returns a list of all airplanes in the museum collection. Authentication required.'
  airplanesController.getAll(req, res);
});

router.post("/", isAuthenticated, (req, res) => {
  // #swagger.tags = ['Airplanes']
  // #swagger.summary = 'Create a new airplane'
  // #swagger.description = 'Adds a new airplane to the museum collection. Authentication required.'
  airplanesController.createAirplane(req, res);
});

router.get("/:id", (req, res) => {
  // #swagger.tags = ['Airplanes']
  // #swagger.summary = 'Get an airplane by ID'
  // #swagger.description = 'Returns a single airplane using its MongoDB ID.'
  airplanesController.getSingle(req, res);
});

router.put("/:id", isAuthenticated, (req, res) => {
  // #swagger.tags = ['Airplanes']
  // #swagger.summary = 'Update an airplane'
  // #swagger.description = 'Replaces an existing airplane with the provided airplane information. Authentication required.'
  airplanesController.updateAirplane(req, res);
});

router.delete("/:id", isAuthenticated, (req, res) => {
  // #swagger.tags = ['Airplanes']
  // #swagger.summary = 'Delete an airplane'
  // #swagger.description = 'Deletes an existing airplane from the museum collection. Authentication required.'
  airplanesController.deleteAirplane(req, res);
});

module.exports = router;
