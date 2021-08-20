import { User } from "@prisma/client";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "config";

export function validPassword(user: User, password: string): boolean {
  var hash = crypto.pbkdf2Sync(password, user.salt, 10000, 512, 'sha512').toString('hex');
  return user.hash === hash;
}

export function setPassword(user: User, password: string): void {
  user.salt = crypto.randomBytes(16).toString('hex');
  user.hash = crypto.pbkdf2Sync(password, user.salt, 10000, 512, 'sha512').toString('hex');
};

export function generateJWT(user: User) {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: user.id,
    name: user.name,
    exp: parseInt((exp.getTime() / 1000).toString()),
  }, config.secret);
};