const { initializeDatabase } = require("./db/db.connect.js");
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const {
  userSignUp,
  loginUser,
  logoutUser,
  refreshAccessToken,
} = require("./controllers/user.controller.js");
const cookieParser = require("cookie-parser");
const verifyJWT = require("./middleware/auth.middleware.js");
const getData = require("./controllers/data.controller.js");
const app = express();

app.use(cookieParser());
app.use(express.json());

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
initializeDatabase();

app.post("/api/signup", userSignUp);
app.post("/api/login", loginUser);
app.post("/api/logout", verifyJWT, logoutUser);
app.post("/api/refresh-token", refreshAccessToken);
app.get("/get-google-sheet-data", getData);

module.exports = { app };
