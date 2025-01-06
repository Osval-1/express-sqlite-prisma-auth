import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  referal:{
    type:String,
    required:true,
  }
  ,affiliate:{
    type:String,
    required:true
  }
});

export const User = mongoose.model("User", userSchema);
module.exports = User;

