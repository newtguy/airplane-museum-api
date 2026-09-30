const { MongoClient } = require("mongodb");

let database;

const initDb = (callback) => {
  if (database) {
    console.log("Db is already initialized!");
    return callback(null, database);
  }

  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      database = client.db("airplane-museum-db");
      console.log("Connected to MongoDB");
      callback(null, database);
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      callback(err);
    });
};

const getDb = () => {
  if (!database) {
    throw Error("Database not initialized");
  }

  return database;
};

module.exports = {
  initDb,
  getDb,
};
