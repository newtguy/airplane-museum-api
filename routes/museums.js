const express = require("express");

const router = express.Router();

const museumsController = require("../controllers/museums");
const isAuthenticated = require("../middleware/auth");

router.get("/", (req, res) => {
  // #swagger.tags = ['Museums']
  // #swagger.summary = 'Get all museums'
  // #swagger.description = 'Returns a list of all museums in the collection.'
  museumsController.getAll(req, res);
});

router.post("/", isAuthenticated, (req, res) => {
  // #swagger.tags = ['Museums']
  // #swagger.summary = 'Create a new museum'
  // #swagger.description = 'Adds a new museum to the collection. Authentication required.'
  museumsController.createMuseum(req, res);
});

router.get("/:id", (req, res) => {
  // #swagger.tags = ['Museums']
  // #swagger.summary = 'Get a museum by ID'
  // #swagger.description = 'Returns a single museum using its MongoDB ID.'
  museumsController.getSingle(req, res);
});

router.put("/:id", isAuthenticated, (req, res) => {
  // #swagger.tags = ['Museums']
  // #swagger.summary = 'Update a museum'
  // #swagger.description = 'Replaces an existing museum with the provided museum information. Authentication required.'
  museumsController.updateMuseum(req, res);
});

router.delete("/:id", isAuthenticated, (req, res) => {
  // #swagger.tags = ['Museums']
  // #swagger.summary = 'Delete a museum'
  // #swagger.description = 'Deletes an existing museum from the collection. Authentication required.'
  museumsController.deleteMuseum(req, res);
});

module.exports = router;
