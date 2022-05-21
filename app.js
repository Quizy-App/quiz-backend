const express = require("express");
const cors = require("cors");
const api = require("./api");
const dbConnect = require("./config");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Options for js doc
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Quiz Backend",
      version: "1.0.0",
    },
  },
  apis: ["./api/routes/*.js"],
};

const app = express();
const { PORT = 8080 } = process.env;
const openApiSpecs = swaggerJsdoc(options);

dbConnect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(openApiSpecs));
app.use("/", api);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
