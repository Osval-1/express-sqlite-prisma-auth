import bcrypt  from 'bcrypt';
import {Response,Request} from "express"
import { prisma } from '../../../server';


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
      const existingUser = await prisma.user.findUnique({
        where:{email:email }});
      if (existingUser) {
        res.status(400).json({message:" email already exists"});
        return 
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser  = await prisma.user.create({ data: { name, email,password:hashedPassword } })
      res.status(201).json({message:`User registered successfully`});
    } catch (error) {
      console.log(error);
      res.status(400).json({message:"Failed to Signup,Please try again later"});;
    }
  };
  