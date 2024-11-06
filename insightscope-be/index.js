const { initializeDatabase } = require("./db/db.connect");
require("dotenv").config();
const Data = require("./models/data.model");
const express = require("express");
const cors = require("cors");
const {
  userSignUp,
  loginUser,
  logoutUser,
  refreshAccessToken,
} = require("./controllers/user.controller");
const cookieParser = require("cookie-parser");
const verifyJWT = require("./middleware/auth.middleware");
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

app.get("/api/data", async (req, res) => {
  try {
    const data = await Data.find();

    if (!data) {
      return res.status(404).json({ message: "No data found" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server connected to port http://localhost:${PORT}`);
});
