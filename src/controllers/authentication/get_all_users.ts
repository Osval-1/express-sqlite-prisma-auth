import {Response,Request} from "express"
import { prisma } from '../../../server';

export const getUsers = async (req:Request, res:Response) => {
    try {
    const users = await prisma.user.findMany();  
      if (!users) {
        res.status(400).json({message:" No user exists"});
        return 
      }
      res.status(200).json({users});
    } catch (error) {
      console.log(error);
      res.status(500).json({message:"Could not get users"});
    }
  };
  