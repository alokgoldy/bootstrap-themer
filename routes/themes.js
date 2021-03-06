import express from 'express';
import Theme from '../models/themesDb.js';
import fs from "fs";
import { execSync } from "child_process";

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




// preview a theme
router.get("/:themeName", async (req, res) => {
  const theme = await Theme.findOne({ theme: req.params.themeName });
  console.log(theme);
  let content = `
  $theme-colors: (
    "primary": ${theme.primary},
    "secondary":${theme.secondary},
    "success":${theme.success},
    "warning":${theme.warning},
    "danger":${theme.danger},
    "info":${theme.info},
  );
  // Bootstrap and its default variables
@import "../../node_modules/bootstrap/scss/bootstrap";
  `;

  fs.writeFileSync("public/sass/theme.scss", content);
  execSync("node-sass public/sass/theme.scss public/css/theme.css");

  res.render("themes/preview", {
    layout: "preview",
  });
});

router.get("/:themeName/download", async (req, res) => {
  
  try {
    const theme = await Theme.findOne({ theme: req.params.themeName });
  
    let content = `
    $theme-colors: (
      "primary": ${theme.primary},
      "secondary":${theme.secondary},
      "success":${theme.success},
      "warning":${theme.warning},
      "danger":${theme.danger},
      "info":${theme.info},
    );
    // Bootstrap and its default variables
  @import "../../node_modules/bootstrap/scss/bootstrap";
    `;

    fs.writeFileSync("public/sass/theme.scss", content);
    execSync("node-sass public/sass/theme.scss public/css/theme.css");

    res.download("public/css/theme.css");
   } catch(e) {
    console.log('Error happend : ', e.message)
   }
});

export {router };