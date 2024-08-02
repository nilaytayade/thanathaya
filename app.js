const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const mongoose = require("mongoose");
const Mess = require("./models/mess");

// Replace with your actual MongoDB connection string
const mongoDBUrl =
  "mongodb+srv://nilay:saymyname@thanathaya.gvkqicv.mongodb.net/?retryWrites=true&w=majority&appName=thanathaya";

mongoose
  .connect(mongoDBUrl)
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((err) => console.log("Failed to connect to MongoDB", err));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));

app.get("/one", async (req, res) => {
  try {
    // Fetch the first document (or adjust query as needed)
    const data = await Mess.findOne({}, { _id: 0, __v: 0 }).lean();
    if (data) {
      res.render("card", { data });
    } else {
      res.status(404).send("No data found.");
    }
  } catch (err) {
    console.error("Error fetching data from MongoDB", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/", async (req, res) => {
  try {
    // Fetch items from MongoDB
    let items = await Mess.find();
    console.log(items);
    res.render("index", { items });
  } catch (err) {
    console.error("Error fetching items from MongoDB", err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${3000}/`);
});
