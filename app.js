const express = require("express");
const cors = require("cors");
const api = require("./api");
const dbConnect = require("./config");

const app = express();
const { PORT = 8080 } = process.env;

dbConnect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", api);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
