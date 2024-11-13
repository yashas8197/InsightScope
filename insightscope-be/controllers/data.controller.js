// Import necessary modules
const fetch = require("node-fetch");
const crypto = require("crypto");

const getData = async (req, res) => {
  let etag = null;
  let lastFetchedData = null;
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
    console.error(error);
    res.status(500).send("Error fetching data");
  }
};

// Helper function to generate the ETag
const generateETag = (data) => {
  const jsonData = JSON.stringify(data);
  return crypto.createHash("md5").update(jsonData).digest("hex");
};

module.exports = getData;
