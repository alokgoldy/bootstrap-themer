import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import bcrypt from "bcrypt";

import User from "./models/User.js";

passport.use(
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    console.log(email, password);

    // check if account is exist or not
    const user = await User.findOne({ email });

    if (!user) {
      return done(null, false, { message: "Incorrect username." });
    }

    // if account exist thne match the password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return done(null, false, { message: "Incorrect password." });
    }
    passport.serializeUser(function (user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
      User.findById(id, function (err, user) {
        done(err, user);
      });
    });

    return done(null, user);
  })
);