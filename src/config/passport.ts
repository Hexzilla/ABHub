import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { PrismaClient } from "@prisma/client";
import { encryptPassword, verifyPassword } from "models/user";

const prisma = new PrismaClient();

passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email: string, password: string, done) => {
      console.log("passport signup", email, password);
      try {
        let user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        if (user) {
          return done(null, null);
        }

        const encrypted = encryptPassword(password);
        user = await prisma.user.create({
          data: {
            email: email,
            name: req.body.name,
            salt: encrypted.salt,
            hash: encrypted.hash,
          },
        });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email: string, password: string, done) => {
      console.log("passport login", email, password);
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        console.log("passport login-1");
        if (!user || !verifyPassword(user, password)) {
          return done("Email or password is invalid");
        }

        console.log("passport login-2");
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
