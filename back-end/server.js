require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// allowing who will fetch data
app.use(cors());

// parse - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();

// default route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to job offer app!!!" });
});

require("./app/routes/job.routes")(app);

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
