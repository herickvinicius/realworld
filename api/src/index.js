const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const router = require("./router");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
// app.use(router);

app.listen(process.env.PORT, () => {
  console.log("Express server listening on port", process.env.PORT);
});
