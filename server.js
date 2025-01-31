require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors()); 
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.post("/clarifai", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.clarifai.com/v2/models/general-image-recognition/outputs",
      req.body,
      {
        headers: {
          "Authorization": `Key ${process.env.CLARIFAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: "Server error" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
