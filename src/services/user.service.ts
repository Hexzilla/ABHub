import { Request, Response } from "express";

export function updatePassword() {
  return {
    user: "updatePassword",
  };
}

export function getUserProfile(req: Request, res: Response) {
  res.send("GetProfile");
}
