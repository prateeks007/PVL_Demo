import mongoose from "mongoose";
import express from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bodyParser from "body-parser";
import People from "./models/test_schema.js";
import axios from "axios";
import cors from "cors";

const app = express();
const port = 3001;

app.use(cors());

const dbURL =
  "mongodb+srv://Prat7:rn7aTa7YufFMk83V@testcluster.ffx7kxp.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(dbURL, { dbName: "PVL_Demo" })
  .then((result) => console.log("DB Connected"))
  .catch((err) => console.log(err));

// People.find().then((data) => console.log(data));

const secretKey = "prat";
// console.log(secretKey);

function secure_jwt(req, res, next) {
  const token = req.headers.authorization;
  // console.log(token);

  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).send("Forbidden");
    }

    req.user = user;
    next();
  });
}

//  call to create a jwt token since the application is not login based.
app.get("/get-token", (req, res) => {
  const user = { username: "exampleUser" };
  const token = jwt.sign(user, secretKey);
  // console.log("get token here");
  // console.log(token);
  res.json({ token });
});

app.use(bodyParser.json());

//get data from database
app.get("/people", secure_jwt, async (req, res) => {
  try {
    const people = await People.find({});
    res.json(people);
    // console.log("get data request");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//update the backend database
app.post("/users/update", secure_jwt, async (req, res) => {
  try {
    const updateData = req.body;
    // console.log(updateData);
    const update_database = await People.findOneAndUpdate(
      { _id: "65421782e23064c3f5be7ee1" },
      updateData,
      { new: true }
    );

    if (!update_database) {
      res.status(404).json({ error: "User not found" });
    } else {
      // console.log("Data updated successfully:", update_database);
      res.json({ message: "Data updated successfully", update_database });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
