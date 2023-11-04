import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({});
const User = mongoose.model("User", userSchema, "customers");

const peopleSchema = new Schema({
  Male: Number,
  Female: Number,
  Boy: Number,
  Girl: Number,
});
const People = mongoose.model("People", peopleSchema, "customers");

// export default User;Ms
export default People;
