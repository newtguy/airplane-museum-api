const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
// swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
// authentication
const session = require("express-session");

dotenv.config();

const passport = require("./config/passport");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

const mongodb = require("./db/connect");
const airplaneRoutes = require("./routes/airplanes");
const museumRoutes = require("./routes/museums");
const authRoutes = require("./routes/auth");

app.use("/airplanes", airplaneRoutes);
app.use("/museums", museumRoutes);
app.use("/auth", authRoutes);

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
