import express from 'express';
import Theme from '../models/themesDb.js';
import  User from "../models/User.js";
import bcrypt from "bcrypt";
import passport  from "passport";
import isAuth from "../middlewares/isAuth.js";



const router = express.Router();

router.get("/",isAuth,async (req,res) => {
    const themes = await Theme.find({});
    res.render("dashboard/home", {
        themes: themes,
    });
})

router.get("/login",(req,res) => {
    res.render("dashboard/login")
})

router.get("/register",(req,res) => {
    res.render("dashboard/register")
})

router.post("/register", async (req, res) => {
    const { fullname, email, password } = req.body;
    const new_user = new User({
      fullname,
      email,
      password,
    });
  
    const salt = await bcrypt.genSalt(10);
    new_user.password = await bcrypt.hash(new_user.password, salt);
  
    await new_user.save();
    res.redirect("/dashboard");
  });
  

  router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/dashboard/login",
    })
  );

  router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });


export {router } ;