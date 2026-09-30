const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

const mongodb = require("./db/connect");
const airplaneRoutes = require("./routes/airplanes");
const museumRoutes = require("./routes/museums");

app.use("/airplanes", airplaneRoutes);
app.use("/museums", museumRoutes);

// Swagger API documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 8080;

mongodb.initDb((err) => {
  if (err) {
    console.log("Database connection failed.");
  } else {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
});
