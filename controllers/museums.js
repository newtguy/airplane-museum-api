const { ObjectId } = require("mongodb");
const mongodb = require("../db/connect");

// GET all museums
const getAll = async (req, res) => {
  try {
    const db = mongodb.getDb();

    const result = await db.collection("museums").find().toArray();

    res.status(200).json(result);
  } catch (err) {
    console.error("Error getting museums:", err);

    res.status(500).json({
      error: "An error occurred while retrieving museums.",
    });
  }
};

// GET one museum by ID
const getSingle = async (req, res) => {
  try {
    const db = mongodb.getDb();

    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        error: "Invalid museum ID.",
      });
    }

    const museumId = new ObjectId(req.params.id);

    const result = await db.collection("museums").findOne({ _id: museumId });

    if (!result) {
      return res.status(404).json({
        error: "Museum not found.",
      });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Error getting museum:", err);

    res.status(500).json({
      error: "An error occurred while retrieving the museum.",
    });
  }
};

// POST - Create a new museum
const createMuseum = async (req, res) => {
  try {
    const { name, location, country, description, website, founded } = req.body;

    // Check that all required fields are present
    if (
      !name ||
      !location ||
      !country ||
      !description ||
      !website ||
      founded === undefined
    ) {
      return res.status(400).json({
        error: "All museum fields are required.",
      });
    }

    const newMuseum = {
      name,
      location,
      country,
      description,
      website,
      founded,
    };

    const db = mongodb.getDb();

    const result = await db.collection("museums").insertOne(newMuseum);

    res.status(201).json({
      message: "Museum created successfully.",
      id: result.insertedId,
    });
  } catch (err) {
    console.error("Error creating museum:", err);

    res.status(500).json({
      error: "An error occurred while creating the museum.",
    });
  }
};

// PUT - Update an existing museum
const updateMuseum = async (req, res) => {
  try {
    const db = mongodb.getDb();

    // Validate MongoDB ID
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        error: "Invalid museum ID.",
      });
    }

    const museumId = new ObjectId(req.params.id);

    const { name, location, country, description, website, founded } = req.body;

    // Check that all required fields are present
    if (
      !name ||
      !location ||
      !country ||
      !description ||
      !website ||
      founded === undefined
    ) {
      return res.status(400).json({
        error: "All museum fields are required.",
      });
    }

    const updatedMuseum = {
      name,
      location,
      country,
      description,
      website,
      founded,
    };

    const result = await db
      .collection("museums")
      .replaceOne({ _id: museumId }, updatedMuseum);

    if (result.matchedCount === 0) {
      return res.status(404).json({
        error: "Museum not found.",
      });
    }

    res.status(204).send();
  } catch (err) {
    console.error("Error updating museum:", err);

    res.status(500).json({
      error: "An error occurred while updating the museum.",
    });
  }
};

// DELETE - Delete a museum
const deleteMuseum = async (req, res) => {
  try {
    const db = mongodb.getDb();

    // Validate MongoDB ID
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        error: "Invalid museum ID.",
      });
    }

    const museumId = new ObjectId(req.params.id);

    const result = await db.collection("museums").deleteOne({ _id: museumId });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        error: "Museum not found.",
      });
    }

    res.status(204).send();
  } catch (err) {
    console.error("Error deleting museum:", err);

    res.status(500).json({
      error: "An error occurred while deleting the museum.",
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createMuseum,
  updateMuseum,
  deleteMuseum,
};
