const jwt = require("jsonwebtoken");
import bcrypt  from 'bcrypt';
import { User } from "../../models/user.model";
import mongoose from "mongoose"
import {Response,Request,RequestHandler} from "express"

export const login = async (req:Request, res:Response) => {
    try {
      const { email, password } = req.body;
      if(!email||!password){
       res.status(400).json({message:" please provide all information"});
       return
      }
      const isUser = await User.findOne({ email });
      if (!isUser) {
        res.status(400).json({message:" email doesn't exists"});
        return 
      }
      const comparePasswords = await bcrypt.compare(password, isUser.password);
      if (!comparePasswords) {
        res.status(200).json({message:"Incorrect password"});
        return 
      }
      const token = jwt.sign(isUser.id, process.env.SECRETKEY);
      res.status(200).json({ ...isUser, jwttoken: token });
    } catch (error) {
      console.log(error);
      res.status(400).json({message:"error logging in"});
    }
  };