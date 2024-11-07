const { initializeDatabase } = require("./db/db.connect");
require("dotenv").config();
const Data = require("./models/data.model");
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
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

let etag = null;
let lastFetchedData = null;

const generateETag = (data) => {
  const jsonData = JSON.stringify(data);
  return require("crypto").createHash("md5").update(jsonData).digest("hex");
};

app.get("/get-google-sheet-data", async (req, res) => {
  const clientETag = req.headers["if-none-match"];

  if (etag && clientETag === etag) {
    console.log("Cache hit, returning 304 Not Modified");
    return res.status(304).send("Not Modified");
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/1l7GstWHc69HPV0irSdvoMIyHgtufUPKsbtCiNw7IKR0/values/Sheet3!A1:I105?key=AIzaSyBz5mnkgo89_e1cWlFK1AVNZ_1MCVVOFqA`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    lastFetchedData = data;
    etag = generateETag(data);

    res.set("ETag", etag);
    res.set("Cache-Control", "max-age=60");
    res.json(data);
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});

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
