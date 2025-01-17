const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(logger("dev"));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", require("./routes/index"));
app.use("/api/user", require("./routes/user"));
app.use("/api/proposal", require("./routes/proposal"));
app.use("/api/vote", require("./routes/voted"));

module.exports = app;
