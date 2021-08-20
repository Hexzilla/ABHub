import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { User } from "../models/user";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req: Request, res: Response) => {
  const user: User = {
    email: "bluebird2511@prisma.io",
    name: "Blue Bird",
  };
  const createUser = await prisma.user.create({ data: user });
  console.log("createUser", createUser);

  res.send("Well done!!");
});

export default router;
