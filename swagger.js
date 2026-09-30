const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Airplane Museum API",
    description: "API for managing airplanes and museums",
  },
  host: "localhost:8080",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";

const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
