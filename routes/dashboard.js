import express from 'express';
import Theme from '../models/themesDb.js'
const router = express.Router();

router.get("/",async (req,res) => {
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

export {router } ;