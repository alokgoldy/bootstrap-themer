import express from 'express';
import handlebars from 'express-handlebars';
import {router as dashboardRoute} from './routes/dashboard.js';
import {router as themesRoute} from './routes/themes.js';
import connectDatabase from './db.js'
import Handlebars from 'handlebars';
import {allowInsecurePrototypeAccess} from '@handlebars/allow-prototype-access';
import path from 'path';
import methodOverride from "method-override";



const PORT = 5000;
const app = express();


app.set('view engine','hbs');

app.engine('hbs',handlebars({
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));

connectDatabase();

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

const __dirname = path.resolve();

// set public access for application
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({extended:false}));

app.get("/", (req,res) => {
    res.render("home");
    
})

app.get("/about", (req,res) => {
    res.render("pages/about");
})

app.get("/contact", (req,res) => {
    res.render("pages/contact");
})

app.use("/dashboard",dashboardRoute);
app.use("/themes",themesRoute);

app.listen(PORT,()=>{
    console.log(`App is running at http://localhost:${PORT}`)
})