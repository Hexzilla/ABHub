import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { PrismaClient, User } from "@prisma/client";
import { validPassword } from "models/user";

passport.use(
  "local-strategy",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      const prisma = new PrismaClient();
      prisma.user.findUnique({
        where: {
          email: email,
        },
      })
      .then((user: User | null) => {
        if (!user || !validPassword(user, password)) {
          return done(null, false, {
            message: "email or password is invalid",
          });
        }
        return done(null, user);
      })
      .catch(done);
    }
  )
);
