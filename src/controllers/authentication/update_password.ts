import bcrypt from "bcrypt";
import { Response, Request } from "express";
import { prisma } from "../../../server";

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    if (!email || !oldPassword || !newPassword) {
      res.status(400).json({ message: " please provide all information" });
      return;
    }
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!existingUser) {
      res.status(400).json({ message: "user does not exists" });
      return;
    }
    const comparePasswords = await bcrypt.compare(
      oldPassword,
      existingUser.password
    );
    if (!comparePasswords) {
      res.status(400).json({ message: "Incorrect Old Password" });
      return;
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const newUser  = await prisma.user.update({
        where:{email:email},
        data:{password:newPassword}
    })
    res.status(201).json({ message: `password updated successfully` });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message:error });
  }
};
