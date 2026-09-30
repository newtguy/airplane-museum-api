const { ObjectId } = require("mongodb");
const mongodb = require("../db/connect");

// GET all airplanes
const getAll = async (req, res) => {
  try {
    const db = mongodb.getDb();

    const result = await db.collection("airplanes").find().toArray();

    res.status(200).json(result);
  } catch (err) {
    console.error("Error getting airplanes:", err);

    res.status(500).json({
      error: "An error occurred while retrieving airplanes.",
    });
  }
};

// GET one airplane by ID
const getSingle = async (req, res) => {
  try {
    const db = mongodb.getDb();

    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        error: "Invalid airplane ID.",
      });
    }

    const airplaneId = new ObjectId(req.params.id);

    const result = await db
      .collection("airplanes")
      .findOne({ _id: airplaneId });

    if (!result) {
      return res.status(404).json({
        error: "Airplane not found.",
      });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Error getting airplane:", err);

    res.status(500).json({
      error: "An error occurred while retrieving the airplane.",
    });
  }
};

// POST - Create a new airplane
const createAirplane = async (req, res) => {
  try {
    const {
      name,
      manufacturer,
      model,
      country,
      year,
      category,
      crew,
      museumId,
    } = req.body;

    // Check that all required fields are present
    if (
      !name ||
      !manufacturer ||
      !model ||
      !country ||
      !year ||
      !category ||
      crew === undefined ||
      !museumId
    ) {
      return res.status(400).json({
        error: "All airplane fields are required.",
      });
    }

    const newAirplane = {
      name,
      manufacturer,
      model,
      country,
      year,
      category,
      crew,
      museumId,
    };

    const db = mongodb.getDb();

    const result = await db.collection("airplanes").insertOne(newAirplane);

    res.status(201).json({
      message: "Airplane created successfully.",
      id: result.insertedId,
    });
  } catch (err) {
    console.error("Error creating airplane:", err);

    res.status(500).json({
      error: "An error occurred while creating the airplane.",
    });
  }
};

// PUT - Update an existing airplane
const updateAirplane = async (req, res) => {
  try {
    const db = mongodb.getDb();

    // Validate MongoDB ID
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        error: "Invalid airplane ID.",
      });
    }

    const airplaneId = new ObjectId(req.params.id);

    const {
      name,
      manufacturer,
      model,
      country,
      year,
      category,
      crew,
      museumId,
    } = req.body;

    // Check that all required fields are present
    if (
      !name ||
      !manufacturer ||
      !model ||
      !country ||
      !year ||
      !category ||
      crew === undefined ||
      !museumId
    ) {
      return res.status(400).json({
        error: "All airplane fields are required.",
      });
    }

    const updatedAirplane = {
      name,
      manufacturer,
      model,
      country,
      year,
      category,
      crew,
      museumId,
    };

    const result = await db
      .collection("airplanes")
      .replaceOne({ _id: airplaneId }, updatedAirplane);

    if (result.matchedCount === 0) {
      return res.status(404).json({
        error: "Airplane not found.",
      });
    }

    res.status(204).send();
  } catch (err) {
    console.error("Error updating airplane:", err);

    res.status(500).json({
      error: "An error occurred while updating the airplane.",
    });
  }
};

// DELETE - Delete an airplane
const deleteAirplane = async (req, res) => {
  try {
    const db = mongodb.getDb();

    // Validate MongoDB ID
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        error: "Invalid airplane ID.",
      });
    }

    const airplaneId = new ObjectId(req.params.id);

    const result = await db
      .collection("airplanes")
      .deleteOne({ _id: airplaneId });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        error: "Airplane not found.",
      });
    }

    res.status(204).send();
  } catch (err) {
    console.error("Error deleting airplane:", err);

    res.status(500).json({
      error: "An error occurred while deleting the airplane.",
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createAirplane,
  updateAirplane,
  deleteAirplane,
};
