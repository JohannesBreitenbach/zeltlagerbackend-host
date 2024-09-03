const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Message = require("./models/messageModel");
const sendEmail = require("./myEmailService");
const Enrol = require("./models/enrolModel");
const Email = require("./models/emailModel");
require("dotenv").config();

const databaseUrl = process.env.DATABASE_URL;
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(databaseUrl)
  .then(() => {
    console.log("Connected to database!");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/message", async (req, res) => {
  console.log("POST /message called");
  try {
    const message = await Message.create(req.body); //add to mongoDB
    sendEmail("contact", req.body); //send notification email
    res.status(201).json(message);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/messages", async (req, res) => {
  console.log("GET /message called");
  try {
    const messages = await Message.find({});
    res.json(messages);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

app.post("/enrol", async (req, res) => {
  console.log("POST /enrol called");
  try {
    const enrol = await Enrol.create(req.body);
    sendEmail("enrol", req.body);
    res.status(201).json(enrol);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

app.get("/enrol", async (req, res) => {
  console.log("GET /enrol called");
  try {
    const enrols = await Enrol.find({});
    res.json(enrols);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

app.post("/email", async (req, res) => {
  console.log("POST /email called");
  try {
    const email = await Email.create(req.body);
    res.status(201).json(email);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

app.get("/email", async (req, res) => {
  console.log("GET /email called");
  try {
    const emails = await Email.find({});
    res.json(emails);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

//just for testing
app.get("/api", (req, res) => {
  res
    .status(201)
    .json({ users: ["User1", "User2", "User3", "User4", "User5", "User6"] });
});
