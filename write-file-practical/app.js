const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || "5050";
const userRoutes = require("./Server/routes/UserRouts");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1/user", userRoutes);

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
