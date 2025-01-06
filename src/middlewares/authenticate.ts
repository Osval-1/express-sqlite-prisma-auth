const jwt = require("jsonwebtoken");
import { User } from "../models/user.model";
import mongoose from "mongoose"
import {Response,Request,NextFunction} from "express"





export const isUserAuthenticated = async (req:Request, res:Response,next:NextFunction) => {
  try {
    const { authorization } = req.headers;
    if(!authorization){
        return res.status(401).json({message:"User not logged in"})
    }
    const token = authorization.split(" ")[1];
    const decodedId = jwt.verify(token, process.env.SECRETKEY);
    if(!decodedId){
        return res.status(401).json({message:"User not logged in"})
    }
    const isAuthenticatedUser = await User.findById(decodedId)

    //  req.user  = isAuthenticatedUser
    next()
  } catch (error) {
    console.log(error);
    res.status(401).json({message:"Not Authenticated,Please Login"})
  }
};
