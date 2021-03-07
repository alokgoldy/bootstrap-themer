import express from 'express';
import Theme from '../models/themesDb.js'

const router = express.Router();

router.post("/",async(req,res) =>  {
    const newTheme = new Theme({
        theme: req.body.theme,
        primary: req.body.primary,
        secondary: req.body.secondary,
        success: req.body.success,
        danger: req.body.danger,
        warning: req.body.warning,
        info: req.body.info,
      });
    
      await newTheme.save();
      res.redirect("/dashboard");
    
})

router.delete("/", async (req, res) => {
  await Theme.findByIdAndRemove(req.body.themeId);
  res.redirect("/dashboard");
});

router.get("/", async (req, res) => {
  const {themeId} = req.query
  const theme = await Theme.findById(themeId)
  res.app.locals.mytheme = theme;

  res.redirect("/dashboard");
});

router.put("/", async (req, res) => {
  const updatedTheme = {
    theme: req.body.theme,
    primary: req.body.primary,
    secondary: req.body.secondary,
    success: req.body.success,
    danger: req.body.danger,
    warning: req.body.warning,
    info: req.body.info,
  };

  await Theme.findByIdAndUpdate(req.body.themeId, updatedTheme);
  res.app.locals.mytheme = null;
  res.redirect("/dashboard");
});


router.get("/:themeName",(req,res) => {
  console.log("hi")
  console.log(req.params.themeName);
  res.redirect("/dashboard");
})

export {router };