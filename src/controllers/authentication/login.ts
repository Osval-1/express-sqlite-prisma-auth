const jwt = require("jsonwebtoken");
import bcrypt from "bcrypt";
import { Response, Request } from "express";
import { prisma } from "../../../server";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: " please provide all information" });
      return;
    }
    const isUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!isUser) {
      res.status(400).json({ message: "email doesn't exists" });
      return;
    }
    const comparePasswords = await bcrypt.compare(password, isUser.password);
    if (!comparePasswords) {
      res.status(200).json({ message: "Incorrect password" });
      return;
    }
    const token = jwt.sign(isUser.id, process.env.SECRETKEY, {
      expiresIn: 24 * 60 * 60,
    });
    res.status(200).json({ ...isUser, jwttoken: token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to login,Please try again later" });
  }
};
