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
  console.log(req.body)
  await Theme.findByIdAndRemove(req.body.themeId);
  res.redirect("/dashboard");
});

export {router };