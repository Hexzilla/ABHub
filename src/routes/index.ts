import { Router, Request, Response, NextFunction } from "express";
import users from "./users";

const router = Router();

router.get("/", (req, res) => {
  res.send("Welcome!");
});
router.use("/user", users);

router.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === "ValidationError") {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce((errors: any, key: string) => {
        errors[key] = err.errors[key].message;
        return errors;
      }, {}),
    });
  }

  return next(err);
});

export default router;

/*import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { User } from "models/user";

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
*/
