import bcrypt  from 'bcrypt';
import { User } from "../../models/user.model";
import mongoose from "mongoose"
import {Response,Request,RequestHandler} from "express"

export const signup = async (req:Request, res:Response) => {
    try {
      const {
        name,
        email,
        password,
      } = req.body;
      if(!name||!email||!password){
        res.status(400).json({message:" please provide all information"});
        return 
      }
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({message:" email already exists"});
        return 
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(201).json({message:`User registered successfully,${newUser}`});
    } catch (error) {
      console.log(error);
      res.status(400).json({message:"error logging in"});;
    }
  };
  