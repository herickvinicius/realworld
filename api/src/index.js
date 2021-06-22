const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
// const database = require("./config/database");

dotenv.config();

require("./database");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.listen(process.env.PORT, () => {
  console.log("Express server listening on port", process.env.PORT);
});
