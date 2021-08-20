import { User } from "@prisma/client";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "config";

export function verifyPassword(user: User, password: string): boolean {
  var hash = crypto.pbkdf2Sync(password, user.salt, 10000, 512, 'sha512').toString('hex');
  return user.hash === hash;
}

export function encryptPassword(password: string): { salt: string, hash: string } {
  const salt = crypto.randomBytes(16).toString('hex');
  return { 
    salt,
    hash: crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex'),
  }
};

export function generateJWT(user: User): string {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: user.id,
    name: user.name,
    exp: parseInt((exp.getTime() / 1000).toString()),
  }, config.secret);
};

export default User;